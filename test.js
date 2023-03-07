let str = 'It is a long text you need to handle to show less';

let strHandled = str.split(' ').slice(0, 10).join(' ');

console.log(strHandled);