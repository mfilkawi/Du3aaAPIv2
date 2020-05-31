const router = require('express').Router();
const crypto = require('crypto');
const uuid = require('uuid');
const axios = require('axios');
const qs = require('querystring');
twitterModel = require('../models/twitterModel');

router.post('/oauth', (req, res) => {
    const method = 'POST';
    const base_url = 'https://api.twitter.com/oauth/request_token';
    const consumer_key = process.env.CONSUMER_KEY;
    const secret_key = process.env.CONSUMER_SECRET;
    
    const oauth_timestamp = Math.floor(Date.now() / 1000);
    const oauth_nonce = uuid.v1();
    
    const parameters = {
        oauth_consumer_key: consumer_key,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: oauth_timestamp,
        oauth_nonce: oauth_nonce,
        oauth_version: '1.0'
    }

    // Create Signute
    let ordered = {};
    Object.keys(parameters).sort().forEach(function(key) {
        ordered[key] = parameters[key];
    });
    let encodedParameters = '';
    for (k in ordered) {
        let encodedValue = escape(ordered[k]);
        let encodedKey = encodeURIComponent(k);
        if(encodedParameters === ''){
            encodedParameters += `${encodedKey}=${encodedValue}`;
        }
        else{
            encodedParameters += `&${encodedKey}=${encodedValue}`;
        } 
    }
    const encodedUrl = encodeURIComponent(base_url);
    encodedParameters = encodeURIComponent(encodedParameters);
    const signature_base_string = `${method}&${encodedUrl}&${encodedParameters}`
    const signing_key = `${secret_key}&`;
    const oauth_signature = crypto.createHmac('sha1', signing_key).update(signature_base_string).digest().toString('base64');
    const encoded_oauth_signature = encodeURIComponent(oauth_signature);
    
    
    const authorization_header = `OAuth oauth_consumer_key="${consumer_key}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}",oauth_nonce="${oauth_nonce}",oauth_version="1.0",oauth_signature="${encoded_oauth_signature}"`

    axios({
        method: method,
        url: base_url,
        headers: {
            'Authorization': authorization_header
        }
    })
        .then(response => {
            var data = response.data;
            var url = TwitterOAuthURL(data);
            res.send({url});
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/callback', (req, res) => {
    if (req.query.denied) {
        res.cookie('status', 'canceled').redirect('/');
    }
    const oauth_token = req.query.oauth_token;
    const oauth_verifier = req.query.oauth_verifier;
    
    axios({
        method: "post",
        url: `https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`
    })
        .then(response => {

            var data = qs.decode(response.data);
            var twitter = new twitterModel();

            twitterModel.findOne({ user_id: data.user_id }).then(user => {
                if (user) {
                    res.cookie('status', 'userexsists').redirect('/');
                }else{
                    twitter.oauth_token = data.oauth_token;
                    twitter.oauth_token_secret = data.oauth_token_secret;
                    twitter.user_id = data.user_id;
                    twitter.screen_name = data.screen_name;
                    
                    twitter.save(function (err) {
                        if (err){
                            res.cookie('status', 'error').redirect('/');
                        }else{
                            res.cookie('status', 'useradded').redirect('/');
                        }
                    });
                }
            });

        })
        .catch(err => {
            console.log(err);
            res.cookie('status', 'error').redirect('/');
        })
});

function TwitterOAuthURL(res){
    var oauth_token = qs.decode(res).oauth_token;
    return `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`;
}

module.exports = router;