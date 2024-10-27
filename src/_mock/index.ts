import Mock from 'mockjs';

Mock.mock('/api/user', 'get', () => ({
	name: '张三',
	age: 18
}));
