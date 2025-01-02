# Chat Warrior Self Bot

Chat Warrior is a Discord self-bot designed for **educational purposes only**. It sends Hindi abusive messages, automates repetitive actions, and demonstrates how bots interact with Discord APIs.

> **Disclaimer**: Using self-bots violates [Discord's Terms of Service](https://discord.com/terms). This bot is for learning purposes only. Use at your own risk.

---

## Features
- Sends Hindi abusive messages from a predefined list.
- Responds to special triggers with custom replies.
- Targets users with continuous abusive pings.
- Easy-to-setup and customizable.

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/titaniumofficial/Chat-warrior-self-bot-
```

### 2. Install Dependencies
```bash
npm install discord.js-selfbot-v13 fs path
```

### 3. Configure the Bot
- Open the `config.json` file and paste your bot token:
```json
{
  "token": "YOUR_DISCORD_TOKEN_HERE"
}
```

- **Note**: The `words.json` and `sentences.json` files are already pre-configured. If you want to edit them you can.
- 
### 4. Run the Bot
```bash
node index.js
```

---

## Commands

| Command                | Description                                        |
|------------------------|----------------------------------------------------|
| `!target @user`        | Add/remove a user to/from the abuse target list.   |
| `!fuck @user`          | Continuously ping and abuse the mentioned user.    |
| **Triggers**           | **Custom Responses:**                              |
| `chl vc aa`            | Replies: `Kyo apni maa ke nudes dikhayega?`        |
| `chl teri maa ki chut` | Replies: `Teri maa ka lund hai na, latak ke jhul ja?` |

---

## Educational Purpose

This project is for **educational and learning purposes** only. It demonstrates:
- How to create a self-bot using Discord's APIs.
- File handling for dynamic configurations.
- Automating tasks and responding to user inputs.

---

## Support
For any queries or assistance, feel free to contact **Omkar.dxddy** on Discord.

---

### Disclaimer
This tool is intended for educational purposes only. Misuse of this bot may result in account bans or other penalties. Use responsibly and respect others.
```
