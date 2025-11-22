const Member = require("../models/Member");
const { sendWelcomeSMS } = require("../utils/sms");
const { Op } = require("sequelize");

const fs = require("fs");
const csvParser = require("csv-parser");

const { sendEmail } = require("../utils/email");
const { loadTemplate } = require("../utils/templateLoader");

// ----------------------------------------------------
// CREATE MEMBER
// ----------------------------------------------------
exports.createMember = async (req, res) => {
  try {
    const {
      firstName, lastName, phone, gender,
      email, dateOfBirth, address, maritalStatus,
      occupation, isBaptized, isWorker,
      emergencyContactName, emergencyContactPhone,
      profilePhoto, notes
    } = req.body;

    if (!firstName || !lastName || !phone || !gender) {
      return res.status(400).json({
        error: "Missing required fields: firstName, lastName, phone, gender"
      });
    }

    const existing = await Member.findOne({ where: { phone } });
    if (existing)
      return res.status(409).json({ error: "Member with this phone already exists" });

    const member = await Member.create({
      firstName, lastName, phone, gender,
      email,
      dateOfBirth,
      address,
      maritalStatus,
      occupation,
      isBaptized,
      isWorker,
      emergencyContactName,
      emergencyContactPhone,
      profilePhoto,
      notes
    });

    // Optional SMS
    try { 
      await sendWelcomeSMS(phone, firstName); 
    } catch (_) {}

    // Optional Email (HTML Template)
    try { 
      if (email) {
        const html = loadTemplate("welcome", { name: firstName });
        await sendEmail(email, "Welcome to SpiritLynk Hub", html);
      }
    } catch (err) {
      console.warn("Welcome Email failed:", err.message);
    }

    return res.json({ message: "Member created", member });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create member" });
  }
};

// ----------------------------------------------------
// LIST MEMBERS
// ----------------------------------------------------
exports.listMembers = async (req, res) => {
  try {
    const members = await Member.findAll({ order: [["createdAt", "DESC"]] });
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list members" });
  }
};

// ----------------------------------------------------
// GET MEMBER
// ----------------------------------------------------
exports.getMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get member" });
  }
};

// ----------------------------------------------------
// UPDATE MEMBER
// ----------------------------------------------------
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });

    await member.update(req.body);
    res.json({ message: "Member updated", member });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update member" });
  }
};

// ----------------------------------------------------
// DELETE MEMBER
// ----------------------------------------------------
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });

    await member.destroy();
    res.json({ message: "Member deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete member" });
  }
};

// ----------------------------------------------------
// SEARCH MEMBERS
// ----------------------------------------------------
exports.searchMembers = async (req, res) => {
  try {
    const { query = "", page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${query}%` } },
        { lastName: { [Op.iLike]: `%${query}%` } },
        { phone: { [Op.iLike]: `%${query}%` } },
        { email: { [Op.iLike]: `%${query}%` } }
      ]
    };

    const results = await Member.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset
    });

    return res.json({
      total: results.count,
      page: parseInt(page),
      pages: Math.ceil(results.count / limit),
      members: results.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
};

// ----------------------------------------------------
// IMPORT MEMBERS FROM CSV
// ----------------------------------------------------
exports.importMembers = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "CSV file is required" });
  }

  const filePath = req.file.path;
  const rows = [];
  const imported = [];
  const skipped = [];

  try {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => rows.push(row))
      .on("end", async () => {

        for (const row of rows) {
          const { firstName, lastName, phone, gender, email, address, maritalStatus } = row;

          if (!firstName || !lastName || !phone || !gender) {
            skipped.push({ row, reason: "Missing required fields" });
            continue;
          }

          const existing = await Member.findOne({ where: { phone } });
          if (existing) {
            skipped.push({ row, reason: "Phone already exists" });
            continue;
          }

          try {
            const member = await Member.create({
              firstName,
              lastName,
              phone,
              gender,
              email: email || null,
              address: address || null,
              maritalStatus: maritalStatus || "single",
              joinedDate: new Date(),
            });

            imported.push(member);

          } catch (err) {
            skipped.push({ row, reason: err.message });
          }
        }

        fs.unlinkSync(filePath);

        return res.json({
          message: "Import completed",
          totalRows: rows.length,
          imported: imported.length,
          skipped: skipped.length,
          skippedRows: skipped,
        });
      });

  } catch (err) {
    console.error("CSV Import Error:", err);
    return res.status(500).json({ error: "Import failed" });
  }
};

// ----------------------------------------------------
// EXPORT MEMBERS TO CSV
// ----------------------------------------------------
const { Parser } = require("json2csv");

exports.exportMembersCSV = async (req, res) => {
  try {
    const members = await Member.findAll();

    if (!members || members.length === 0) {
      return res.status(404).json({ error: "No members found to export" });
    }

    const fields = [
      "id",
      "firstName",
      "lastName",
      "phone",
      "gender",
      "email",
      "address",
      "maritalStatus",
      "occupation",
      "isBaptized",
      "isWorker",
      "joinedDate",
      "createdAt"
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(members.map(m => m.toJSON()));

    res.header("Content-Type", "text/csv");
    res.attachment("members_export.csv");
    return res.send(csv);

  } catch (err) {
    console.error("CSV Export Error:", err);
    return res.status(500).json({ error: "Failed to export CSV" });
  }
};
