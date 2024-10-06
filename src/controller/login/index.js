const { authenticateUser, generateJWT } = require('../../middleware/index');
const { validateUser } = require('../../middleware/validations/index')
const router = require('express').Router();

router.route('/').post(validateUser,authenticateUser, generateJWT, async (req, res) => {
  try {
    const accessToken = req.accessToken
    console.log('hi i reached here yeeeeeeeeeeeee', accessToken)
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    
    // Send a success response with an empty body
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
