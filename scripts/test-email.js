const { Resend } = require('resend');

async function test() {
  const resend = new Resend('re_QBrkwXze_ADRvVs3Bv6a7amVGKDFCaAaa');
  try {
    console.log('Attempting to send test email...');
    const response = await resend.emails.send({
      from: 'D-Blanks <support@dblanks.site>',
      to: 'arshgupta723.test@gmail.com',
      subject: 'Resend Debug Test',
      html: '<p>Testing delivery for dblanks.site</p>'
    });
    console.log('Response:', JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('Catch Error:', err);
  }
}

test();
