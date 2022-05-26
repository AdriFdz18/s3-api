const {getBuckets} = require('../helpers/s3');

const alumn = async (req,res) => {
    const data = await getBuckets();
    
    res.render('alum',{
        buckets:data.Buckets
    });
};

module.exports = {
    alumn
}