const { authenticateRequest } = require('../../middleware/index');
const { validateSearch } = require('../../middleware/validations/index');
const router = require('express').Router();
const User = require('../../models');

router.route('/').put(validateSearch, authenticateRequest, async (req, res) => {
try {

    const searchHIstory = req.body.search;
    const user = req.user;
    const name = user.username;
    const saveSearchHistory = await User.findOneAndUpdate(
        {
            username: name,
            isDeleted: false,
        },
        {
            $push: { userSearchHistory: searchHIstory },
        }

    );
    
    res.status(200).json({ message: 'saved', data: saveSearchHistory });

} catch (error) {
    res.status(200).json({ message: error.message, data: null });   
}
  
});

router.route('/clear').put( authenticateRequest, async (req, res) => {
    try {
        const user = req.user;
        const name = user.username;
        const clearSearchHistory = await User.findOneAndUpdate(
            {
                username: name,
                isDeleted: false,
            },
            {
                $set: { userSearchHistory: [] } ,
            }
    
        );
        
        res.status(200).json({ message: 'cleared', data: clearSearchHistory });
    
    } catch (error) {
        res.status(200).json({ message: error.message, data: null });   
    }
      
});

router.route('/show').put( authenticateRequest, async (req, res) => {
    try {
        const user = req.user;
        const name = user.username;
        const SearchHistory = await User.findOne(
            {
                username: name,
                isDeleted: false,
            },
    
        );
        
        res.status(200).json({ message: 'fetched data', data: SearchHistory });
    
    } catch (error) {
        res.status(200).json({ message: error.message, data: null });   
    }
      
});

module.exports = router;
