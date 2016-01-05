#!/usr/bin/node

var fs = require('fs');

// input:     key and message
// output:    cipher text

// ecryption process:

//   break message into chunks of key length
//   arrange each chunk in order of the keys alphanumeric positioning
//   join chunks together and return


var sortElements = function(elements, key){
  var temp = {}, sorted = '';
  var key = key.toString();

  for(var i=0; i<elements.length; i++){
    if(temp.hasOwnProperty(key[i])){
      temp[key[i]].push(elements[i]);
    }else{
      temp[key[i]] = [elements[i]];
    }
  }

  var newKey = Object.keys(temp).sort(function(a,b){return a > b});

  for(var i=0; i<newKey.length; i++){
    sorted += temp[newKey[i]].join('');
  }

  return sorted;
}

var encrypt = function(key, message){
  key = key.toString();

  var chunks = message.match(new RegExp('.{1,'+key.length+'}',"g"));
  var cipherText = '';

  for(var i=0; i<chunks.length; i++){
    var elements = chunks[i].split('');
    cipherText += sortElements(elements, key);
  }

  return cipherText;
}



var main = function(){
  var args = process.argv.slice(2, process.argv.length);
  if (args[1].match(/^\//g)){
    // read file
    fs.readFile(args[1], 'utf8', function(err, data){
      console.log(encrypt(args[0], data));
    })
  }else{
    console.log(encrypt(args[0], args[1]))
  }
}

main();

// var test = encrypt('xohf', 'this is a test of the emergency alert system');
// console.log(test);
