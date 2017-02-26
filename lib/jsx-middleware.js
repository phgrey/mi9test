var babel = require('babel-core');
var path = require('path');
var fs = require('fs');
// var loadedFiles = {};

//mean file exists and was not modified until last visit
function check_files(target, cb){
    fs.stat(target, (err1, target_stats) => {
        //could not read target file - not our buiseness
        if(err1 && err1.code !== 'ENOENT') return cb(null, false);
        if(target_stats && !target_stats.isFile()) return cb(null, false);
        fs.stat(src_file_name(target), (err2, source_stats) =>{
            //source file does not exists, oops
            if(err2) return cb(err2.code == 'ENOENT' ? null : err2, false)
            if(source_stats && !source_stats.isFile()) return cb(null, false);
            //convert if target file is absent or  newer then source
            cb(null, err1 || (target_stats.mtime < source_stats.mtime))
        })
    })
}

function convert_file(target_path, cb){
    babel.transformFile(src_file_name(target_path), {presets: ['react']}, (err, data)=>{
        if(err) return cb(err);
        fs.writeFile(target_path, data.code, cb);
    });
}


function src_file_name(target) {
    return target + 'x'; //only jsx => jx is supported for now
}


function should_try(req){
    return ['GET', 'HEAD'].indexOf(req.method.toUpperCase()) > -1
        && /\.js(\.map)?$/.test(req.path)
}

module.exports = function(public_path){
    return (req, res, next) => {
        if(!should_try(req)) return next();
        var requested = path.join(public_path, req.path);
        check_files(requested, (err, do_convert) =>{
                if (!err && do_convert)
                    convert_file(requested, next);
                else
                    next(err);
            });
    }
};