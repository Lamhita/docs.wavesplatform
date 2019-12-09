const fs = require('fs');
const path = require('path');
const deepmerge = require('deepmerge');
const mixin = require('../_mixins');

const rootPath = ''
const localePath = '/en/';
const blockchainPath = rootPath + localePath + 'blockchain/';
const nodePath = rootPath + localePath + 'waves-node/';
const programmingPath = rootPath + localePath + 'smart-contracts/';
const ridePath = rootPath + localePath + 'ride';
const sdkPath = rootPath + localePath + 'waves-api-and-sdk/';
const ending = '.html';

module.exports = deepmerge(mixin, {
    langIconRawSvg: fs.readFileSync(path.resolve(__dirname, './britain-18.svg')).toString(),
    searchPlaceholderText: 'Enter a term and press Return…',
    homePage: {
        welcomeText: 'Welcome to the documentation on everything about Waves platform',
        or: 'Or',
        technologyCategoriesText: 'Browse by topic or technology category',
        technologyCategories: {
            all: 'All',
            beginner: 'Beginner',
            advanced: 'Advanced',
            supplementary: 'Supplementary'
        },
        technologyList: {
            learnAboutWavesPlatform: {
                title: 'Waves Blockchain',
                caption: 'Overview of the Waves blockchain main features. Protocol, consensus, cryptography. Mining, transaction types and fees.',
            },
            node: {
                title: 'Node',
                caption: 'Waves full node. Configuring and running a node. Getting actual blockchain. Activating new features.',
            },
            ecosystemApplications: {
                title: 'Ecosystem Apps',
                caption: 'Useful applications and services built on the Waves blockchain.',
            },
            buildingBlockchainApps: {
                title: 'Building Apps',
                caption: 'Creating smart contract and distributed applications with Waves. Developer tools, APIs and SDKs.',
            },
            rideProgrammingLanguage: {
                title: 'RIDE Programming Language',
                caption: 'Syntax of RIDE. Script types. Build-in functions, operators and structures.',
            },
            miscellaneous: {
                title: 'Keep in Touch',
                caption: 'Join the community, keep up with the latest news and articles, and find out all about events happening on the Waves Platform.',
            }
        },
    },
});
