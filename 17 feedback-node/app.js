var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')
var message = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2019-04-01'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2019-04-01'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2019-04-01'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2019-04-01'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2019-04-01'
  }
]
http.createServer(function (req,res) {
	// 简写方式，该函数会直接被注册为 server 的 request 请求事件处理函数
	var parseObj = url.parse(req.url, true)
	// 使用 url.parse 方法将路径解析为一个方便操作的对象，
	// 第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
	var pathname = parseObj.pathname
	if(pathname === '/'){
		fs.readFile('./views/index.html', function (err,data){
			if (err) {
				return res.end('404 not found')
			}
			var htmlStr = template.render(data.toString(),{
				comments: message
			})
			console.log(data.toString())
			res.end(htmlStr)
		})
	}else if(pathname === '/post'){
		fs.readFile('./views/post.html',function (err,data) {
			if (err) {
				return res.end('404 not found')
			}
			res.end(data)
		})
	}else if (pathname.indexOf('/public/') === 0 ) {
		fs.readFile('.' + pathname, function(err, data) {
			if(err) {
				return res.end('404 not found')
			}
			res.end(data)
		})
	}else if (pathname === '/pinglun') {
		var comment = parseObj.query
		console.log(comment)
		comment.dateTime = '2019-04-01 17:02:01'
		message.unshift(comment)
		res.statusCode = 302
		res.setHeader('Location', '/')
		res.end()
	}else{
      // 其它的都处理成 404 找不到
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
}).listen(3000, function () {
	console.log('running...')
})