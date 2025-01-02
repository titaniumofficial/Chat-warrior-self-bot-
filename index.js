const { Client, Intents } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const words = require('./words.json');
const sentences = require('./sentences.json');

const TARGET_FILE_PATH = path.join(__dirname, 'target.txt');
const FUCK_FILE_PATH = path.join(__dirname, 'fuck.txt');

const specialResponses = {
  'chl vc aa': 'Kyo apni maa ke nudes dikhayega?',
  'chl teri maa ki chut': 'Teri maa ka lund hai na, latak ke jhul ja?'
};

const activePings = new Map();

const client = new Client({
  checkUpdate: false,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

function canSend(channel, client) {
  if (!channel.guild) {
    return true;
  }
  return channel.permissionsFor(client.user)?.has('SEND_MESSAGES');
}

function getTargets(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data
      .split('\n')
      .map(line => line.trim())
      .filter(id => id !== '');
  } catch (err) {
    return [];
  }
}

function toggleTarget(filePath, userId) {
  const targets = getTargets(filePath);
  if (targets.includes(userId)) {
    const updated = targets.filter(id => id !== userId);
    fs.writeFileSync(filePath, updated.join('\n'));
    return `Removed user ID \`${userId}\` from the list.`;
  } else {
    targets.push(userId);
    fs.writeFileSync(filePath, targets.join('\n'));
    return `Added user ID \`${userId}\` to the list.`;
  }
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSentence() {
  const randomWord = getRandom(words);
  const randomTemplate = getRandom(sentences);
  return randomTemplate.replace('{word}', randomWord);
}

async function simulateTyping(channel, durationMs) {
  if (typeof channel.sendTyping === 'function') {
    try {
      channel.sendTyping();
    } catch (err) {
      console.error('Error sending typing indicator:', err);
    }
  }
  return new Promise(resolve => setTimeout(resolve, durationMs));
}

async function startPinging(channel, userId) {
  if (activePings.has(userId)) return;

  const interval = setInterval(async () => {
    if (!canSend(channel, client)) {
      clearInterval(interval);
      activePings.delete(userId);
      return;
    }

    const randomAbuse = `<@${userId}> ${getRandomSentence()}`;
    await channel.send(randomAbuse).catch(() => {
      clearInterval(interval);
      activePings.delete(userId);
    });
  }, 4000);

  activePings.set(userId, interval);
}

function stopPinging(userId) {
  const interval = activePings.get(userId);
  if (interval) {
    clearInterval(interval);
    activePings.delete(userId);
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (content.startsWith('!target')) {
    if (!canSend(message.channel, client)) return;

    const mention = message.mentions.users.first();
    if (!mention) {
      return message.reply('Please mention a user: `!target @username`');
    }
    const result = toggleTarget(TARGET_FILE_PATH, mention.id);
    return message.reply(result);
  }

  if (content.startsWith('!fuck')) {
    if (!canSend(message.channel, client)) return;

    const mention = message.mentions.users.first();
    if (!mention) {
      return message.reply('Please mention a user: `!fuck @username`');
    }

    const userId = mention.id;
    const channel = message.channel;
    
    const result = toggleTarget(FUCK_FILE_PATH, userId);
    if (result.includes('Added')) {
      const immediateAbuse = `<@${userId}> ${getRandomSentence()}`;
      await channel.send(immediateAbuse);

      await message.reply(`Started pinging <@${userId}> continuously in this channel.`);

      startPinging(channel, userId);
    } else {
      stopPinging(userId);
      await message.reply(`Stopped pinging <@${userId}>.`);
    }
    return;
  }

  const targets = getTargets(TARGET_FILE_PATH);
  const isTarget = targets.includes(message.author.id);

  for (const trigger in specialResponses) {
    if (content.includes(trigger)) {
      if (!canSend(message.channel, client)) return;

      await simulateTyping(message.channel, 3000);
      await message.reply(specialResponses[trigger]);
      return;
    }
  }

  if (isTarget) {
    if (!canSend(message.channel, client)) return;

    await simulateTyping(message.channel, 3000);
    const randomAbuse = getRandomSentence();
    await message.reply(randomAbuse);
  }
});

client.login(config.token).catch(err => {
  console.error('Failed to login:', err);
});
