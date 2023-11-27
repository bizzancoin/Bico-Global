


export default function centerHide(email){

    var new_email = "",
        mark = '****',
        firstNum = 3,
        lastNum = 2;

    if (String(email).indexOf('@') > 0) {
　　　　var str = email.split('@'),
            _last = str[0].substr((str[0].length-lastNum), lastNum);

        new_email = str[0].substr(0, firstNum) + mark + _last + '@' + str[1]
　　}else{

        if(email.length > 5){
            new_email = email.substr(0, firstNum) + mark + email.substr((email.length-lastNum), lastNum)
        }else{
            new_email = email
        }

    }
　　return new_email
}