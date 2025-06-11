const db = require('../models');
const Schedule = db.Schedule;

exports.createSchedule = async (req, res) => {
  try {
    const userId = req.session.userId; 
    const { scheduleAt, address } = req.body;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const newSchedule = await Schedule.create({
      userId,
      scheduleAt,
      address,
    });

    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserSchedules = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const schedules = await Schedule.findAll({ where: { userId } });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
