export default function handler(req, res) {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // Set cookie WITHOUT HttpOnly so it's accessible via document.cookie
    res.setHeader(
      'Set-Cookie',
      'admin=loggedin; Path=/; SameSite=Lax; Max-Age=3600'
    );
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, error: 'Invalid credentials' });
}
