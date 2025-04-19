const express = require('express');
const Poll = require('../models/Poll');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// CREATE POLL (Admin only for now)
router.post('/', auth, async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length < 2)
      return res.status(400).json({ msg: 'Invalid poll format' });

    const poll = new Poll({
      question,
      options: options.map(text => ({ text })),
      createdBy: req.user,
    });

    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POLLS
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET SINGLE POLL
router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VOTE ON POLL
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    const user = await User.findById(req.user);
    if (poll.voters.includes(user.id))
      return res.status(403).json({ msg: 'Already voted' });

    const optionIndex = req.body.optionIndex;
    if (optionIndex < 0 || optionIndex >= poll.options.length)
      return res.status(400).json({ msg: 'Invalid option selected' });

    poll.options[optionIndex].votes += 1;
    poll.voters.push(user.id);
    user.hasVoted.push(poll.id);

    await poll.save();
    await user.save();

    res.json({ msg: 'Vote counted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET RESULTS
router.get('/:id/results', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    res.json({
      question: poll.question,
      options: poll.options,
      totalVotes: poll.options.reduce((sum, o) => sum + o.votes, 0),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
