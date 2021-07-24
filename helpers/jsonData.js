module.exports = {

    true_status: function(res, body, msg) {

        res.status(200).json({
            'success': 1,
            'code': 200,
            'msg': msg,
            'data': body,
        });
        return false;
    },
    activity_status: function(res, msg) {
        res.status(501).json({
            'success': 0,
            'code': 501,
            'msg': msg,
            'data': {},
        });
        return false;
    },
    true_status_data: function(res, keys, body, msg) {
        res.status(200).json({
            'success': 1,
            'code': 200,
            'count': keys,
            'msg': msg,
            'data': body,
        });
        return false;
    },

    false_status: function(res, msg) {
        res.status(403).json({
            'success': 0,
            'code': 403,
            'msg': msg,
            'data': {},
        });
        return false;
    },
    invalid_status: function(res, msg) {
        res.status(400).json({
            'success': 0,
            'code': 400,
            'msg': msg,
            'data': {},
        });
        return false;
    },
    Unauthorized: function(res, msg) {
        res.status(401).json({
            'success': 0,
            'code': 401,
            'msg': msg,
            'body': {},
        });
        return false;
    }

}