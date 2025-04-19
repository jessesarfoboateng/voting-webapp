const Poll = require('../models/Poll');
const User = require('../models/User');

const ussdHandler = async (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  const inputs = text.split('*');

  let response = '';

  const latestPoll = await Poll.findOne().sort({ createdAt: -1 });
  if (!latestPoll) {
    response = `END No active poll found.`;
    return res.send(response);
  }

  // Step 0: Show question and options
  if (text === '') {
    response = `CON ${latestPoll.question}\n`;
    latestPoll.options.forEach((opt, i) => {
      response += `${i + 1}. ${opt.text}\n`;
    });
    return res.send(response);
  }

  // Step 1: Cast vote
  const selected = parseInt(inputs[0]) - 1;

  if (selected >= 0 && selected < latestPoll.options.length) {
    // Check if user already voted
    let user = await User.findOne({ phone: phoneNumber });
    if (!user) {
      user = new User({ name: 'USSD Voter', phone: phoneNumber, email: `${phoneNumber}@ussd.com`, password: 'ussdpass' });
      await user.save();
    }

    if (latestPoll.voters.includes(user.id)) {
      response = `END You've already voted.`;
    } else {
      latestPoll.options[selected].votes += 1;
      latestPoll.voters.push(user.id);
      user.hasVoted.push(latestPoll._id);
      await latestPoll.save();
      await user.save();
      response = `END Vote submitted successfully.`;
    }
    return res.send(response);
  }

  res.send('END Invalid selection.');
};

module.exports = ussdHandler;
