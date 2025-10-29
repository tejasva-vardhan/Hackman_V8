const QRCode = require('qrcode');
const fs = require('fs');

// TEAMS LIST - 59 TEAMS
const teams = [
  { code: '26PU87', name: 'Rocket' },
  { code: 'DMYR7C', name: 'Hackathon Comeback' },
  { code: 'AT12E6', name: 'Rasmalai' },
  { code: 'BZH9FE', name: 'Intellicare' },
  { code: '21VE5O', name: 'Grave Mistakes' },
  { code: 'O2U6LG', name: 'Black hat' },
  { code: 'ZQ8OS1', name: 'Impact-X' },
  { code: 'YFYNN5', name: 'GrenckDevs' },
  { code: 'CO0GAD', name: 'QubitStorm' },
  { code: '4E7KZD', name: 'VIZ Coders' },
  { code: 'YDTRSK', name: 'dailyWageDevs' },
  { code: '4HJJZC', name: 'Pamlo' },
  { code: 'J0XOF1', name: 'CosmicCoders' },
  { code: '6AN5EJ', name: 'AI Agentors' },
  { code: 'FYRUK4', name: 'GHHOSTEDD' },
  { code: 'ADZPA7', name: '2 States' },
  { code: '17KP1Z', name: 'IDLY LAKE' },
  { code: 'PEQW7T', name: 'HackKids' },
  { code: '5JU4JL', name: 'Dexter' },
  { code: 'PUK5LC', name: 'Code-Coven' },
  { code: '6Z9WOA', name: 'Hollow Win' },
  { code: 'MA428A', name: 'MoveSense' },
  { code: '3J1K6P', name: 'CODESMEN' },
  { code: 'CDOS3S', name: 'Yodha' },
  { code: 'E7UEEC', name: 'Arcanine' },
  { code: 'R4FV9Q', name: 'UNO' },
  { code: 'X6ZZ1D', name: 'Paddu' },
  { code: 'KTYNUV', name: 'API-tizers' },
  { code: 'LKTNRD', name: 'Creative nexus' },
  { code: 'ACGC1B', name: 'You decide' },
  { code: '70RKZE', name: 'Hustle and Compile' },
  { code: 'FVV53J', name: 'Dekha Jayega' },
  { code: 'JALK8J', name: 'CodeNexus' },
  { code: 'Y9H9RW', name: 'BigmaSallz' },
  { code: '3Z1AJ5', name: 'ByteForge' },
  { code: 'ZJP2XC', name: 'The Witches' },
  { code: 'QADTT7', name: 'Black Clover' },
  { code: '1UMPRF', name: 'Forbidden Phishers' },
  { code: '5S98QF', name: 'BaalKela' },
  { code: 'BR6AT1', name: 'Code nova' },
  { code: 'J1I3K9', name: 'Hack Squad' },
  { code: '5CVSTY', name: 'Neurabit' },
  { code: '0I478M', name: 'IP Farmers' },
  { code: 'R5BZ7Z', name: 'Claude Sonnet 4.5' },
  { code: 'XWE8TH', name: 'EclipseX' },
  { code: 'GYX4HE', name: 'TungTungTungCoders' },
  { code: 'IID7G6', name: '404 ERROR' },
  { code: 'CHLJMS', name: 'ChainReact' },
  { code: 'K7E22R', name: 'geller cup winners' },
  { code: 'HBOPT3', name: '.dll not found' },
  { code: '01CY7V', name: 'Team brinda' },
  { code: 'EFPYP5', name: 'Aestroid' },
  { code: '1P70KZ', name: 'Snac Underflow' },
  { code: 'E1QNIL', name: 'Losers' },
  { code: 'AL7GNI', name: 'DevPolio' },
  { code: 'WUMF8J', name: 'The Astrothunder' },
  { code: 'J8M0G7', name: 'Code_ka_1110s' },
  { code: 'SYOVBK', name: 'Sudo Su' },
  { code: 'DDJ184', name: 'Win Diesel' }
];

// QR codes folder banaye agar nahi hai toh
if (!fs.existsSync('qr-codes')) {
  fs.mkdirSync('qr-codes');
}

async function generateAllQRs() {
  console.log('🚀 QR Codes generation shuru...\n');
  console.log(`Total teams: ${teams.length}\n`);
  
  for (let team of teams) {
    try {
      const url = `https://hackman.dsce.in/admin/food/${team.code}`;
      
      // Drive ke liye perfect filename
      const fileName = `${team.name} - ${team.code}.png`;
      const filePath = `./qr-codes/${fileName}`;
      
      // QR code generate karo
      await QRCode.toFile(filePath, url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      console.log(`✅ ${fileName}`);
    } catch (error) {
      console.log(`❌ Error in ${team.code}:`, error.message);
    }
  }
  
  console.log('\n🎉 Saare QR codes ready hai!');
  console.log('📁 "qr-codes" folder check karo');
  console.log('📧 Ab inko Google Drive pe upload karo');
  console.log(`📊 Total generated: ${teams.length} QR codes`);
}

// Script run karo
generateAllQRs();