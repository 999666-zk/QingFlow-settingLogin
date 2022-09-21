import request from '../utils/request';

export const fetchData = (query) => {
    return request({
        url: './passport/login/table.json',
        method: 'get'
    });
};
