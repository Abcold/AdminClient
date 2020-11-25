const {override,fixBabelImports,addLessLoader}=require('customize-cra');

module.exports = override (
	fixBabelImports('import',{
	libraryName: 'antd',
	libaryDirectory:'es',
	style:true,
	}),
	addLessLoader({
		javascriptEnabled:true,
	})
	);
