const Mock = require('mockjs')

const List = []
const count = 50

// 公司名称数组
const companyNames = [
    'Google', 'Microsoft', 'Apple', 'Amazon', 'Facebook',
    'Tesla', 'Netflix', 'IBM', 'Intel', 'Cisco',
    'Oracle', 'Adobe', 'Salesforce', 'SAP', 'Twitter'
];

// 十二个月份英文单词
const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        // timestamp: +Mock.Random.date('T'),
        'entityType|1': ['Local Company'],
        companies: Mock.Random.pick(companyNames) + ' ' + Mock.mock('@pick(["Inc.", "LLC", "Corp", "Group", "Holdings"])'),
        'entityStatus|1': ['Registered', 'Dissolved'],
        'registerType|1': ['companies', 'charitable_associations', 'business_names', 'international_companies'],
        registeredDate: '@datetime',
        deRegisteredDate: '@datetime',
        'annualReturnFilingMonth|1': monthes,

        // Registered Office Address
        officeEffectiveDate: '@datetime',
        registeredOfficeAddress: 'Refer To Registrar, Port Vila, Vanuatu',

        // Postal Address
        postalEffectiveDate: '@datetime',
        postalAddress: 'Refer To Registrar, Port Vila, Vanuatu',

        // Email Address
        email: '[Not Provided]',

        // Shareholders
        totalShares: '@integer(1, 10)',
        'moreClass|1': ['No', 'Yes'],

        // Filings
        submittedDate: '@datetime',
        registererDate: '@datetime',


    }))
}

module.exports = [
    {
        url: '/vfsc-v1/entity/list',
        type: 'get',
        response: config => {
            const { companies, registerType, page = 1, limit = 20, sort } = config.query

            let mockList = List.filter(item => {
                // if (importance && item.importance !== +importance) return false
                // if (type && item.type !== type) return false
                // if (title && item.title.indexOf(title) < 0) return false
                if (registerType && item.registerType !== registerType) return false
                if (companies && item.companies.indexOf(companies) < 0) return false
                return true
            })


            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            }
        }
    },

    {
        url: '/vfsc-v1/entity/companyDetail',
        type: 'get',
        response: config => {
            const { id } = config.query
            for (const company of List) {
                if (company.id === +id) {
                    return {
                        code: 20000,
                        data: company
                    }
                }
            }
        }
    },

]