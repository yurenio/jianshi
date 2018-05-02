<template>
    <div>
        <div class="nav container_padding">
            <h1><a href="#">简拾</a></h1>
        </div>
        <div class="news_sum container_padding">
            <div class="inner">
                <div class="date"><span>{{date}}</span><span>{{this.getMsgLength()}}</span></div>
            </div>
        </div>
        <div class="news_list container_padding">
            <div class="inner">
                <ul>
                    <li v-for="(item, index) in list" :key="index">
                        <a :href="item.link" target="_blank">
                            <p>{{item.title}}</p>
                            <p>{{item.info}}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="toggle container_padding">
            <div class="inner">
                <span v-on:click="toggleListToday" class="news_list_today" v-if="createButtonLeft">&larr; 今日</span>
                <span v-on:click="toggleList" v-if="createButtonRight">昨日 &rarr;</span>
            </div>
        </div>
        <div class="footer container_padding">
            <span>Copyright &copy; 2014 - 2018 简拾, All Rights Reserved.&nbsp;</span>
            <a href="http://yuren.io/" target="_blank">联系作者</a>
        </div>
    </div>
</template>

<style lang="less">
    @navBg:                 #F28979;
    @newsSumBg:             #50b8d9;
    @containerColor:        #717171;
    @boderColor:            #EEEEE0;
    @footerBg:              #2d2930;
    @footerAColor:          #428bca;
    @footerAColorHover:     #2a6496;
    @toggleBgHover:         #eee;

    @import url('../less/base.less');

    .nav {
        width: 100%;
        background: @navBg;
        margin-bottom: 50px;
        h1 {
            text-align: center;
            a {
                font-size: 24px;
                color: #fff;
                line-height: 50px;
                font-weight: normal;
                &:hover {
                    opacity: 0.65;
                    text-decoration: underline;
                    text-decoration-color: rgba(255, 255, 255, 0.65);
                }
            }
        }
    }

    .news_sum {
        margin-bottom: 40px;
        .inner {
            .date {
                display: inline-block;
                background: @newsSumBg;
                color: #fff;
                padding: 10px;
                border-radius: 5px;
                font-size: 14px;
                span {
                    display: inline-block;
                    margin-right: 10px;
                }
                span:nth-child(2) {
                    margin-right: 0;
                    padding: 0 5px;
                    border-radius: 8px;
                    color: @newsSumBg;
                    background: #fff;
                }
            }
        }
    }

    .news_list {
        margin-bottom: 20px;
        .inner {
            ul {
                li {
                    margin-bottom: 30px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid @boderColor;
                    a {
                        p:nth-child(1) {
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 10px;
                            &:hover {
                                color: @navBg;
                            }
                        }
                        p:nth-child(2) {
                            font-size: 14px;
                            line-height: 1.5em;
                            color: @containerColor;
                        }
                    }
                }
            }
        }
    }

    .toggle {
        margin-bottom: 80px;
        .inner {
            span {
                float: right;
                padding: 5px 15px;
                font-size: 14px;
                border: 1px solid @boderColor;
                color: @navBg;
                border-radius: 15px;
                cursor: pointer;
                &:hover {
                    background: @toggleBgHover;
                }
            }
            .news_list_today {
                float: left;
            }
        }
    }

    .footer {
        height: 80px;
        background: @footerBg;
        color: #fff;
        text-align: center;
        font-size: 14px;
        padding-top: 20px;
        a {
            color: @footerAColor;
            display: inline;
            &:hover {
                color: @footerAColorHover;
                text-decoration: underline;
            }
        }
    }
</style>

<script>
export default {
    data: () => {
        return ({
            list: [],
            date: '',
            createButtonLeft: false,
            createButtonRight: true
        })
    },
    methods: {
        // 获取当天时间
        getToday: function () {
            let myDate = new Date();
            let year =  myDate.getFullYear();
            let month = myDate.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            let day = myDate.getDate();
            day = day < 10 ? '0' + day : day;
            return (year + '-' + month + '-' + day);
        },
        // 获取昨天时间
        getYesterday: function () {
            let myDate = new Date();
            let year =  myDate.getFullYear();
            let month = myDate.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            let day = myDate.getDate();
            day = day < 10 ? '0' + day : day;
            return (year + '-' + month + '-' + (day - 1));
        },
        // 获取新闻总条数
        getMsgLength: function () {
            return (this.$data.list.length);
        },
        // 点击切换新闻列表
        toggleList: function () {
            this.$data.date = this.getYesterday();
            this.$http.get('jianshi-backend/data.php?date=' + date).then((data) => {
                this.$data.list = data.data.data;
                window.scrollTo(0,0);
                this.$data.createButtonLeft = !this.$data.createButtonLeft;
                this.$data.createButtonRight = !this.$data.createButtonRight;
            })
        },
        toggleListToday: function () {
            this.$data.date = this.getToday();
            this.$http.get('jianshi-backend/data.php').then((data) => {
                this.$data.list = data.data.data
                    })
                    window.scrollTo(0,0);
                    this.$data.createButtonLeft = !this.$data.createButtonLeft;
                this.$data.createButtonRight = !this.$data.createButtonRight;
        }
    },
    created() {
        this.$data.date = this.getToday();
        this.$http.get('jianshi-backend/data.php?date=' + date).then((data) => {
                        if (data.data.data === undefined) {
                            return;
                        }
                        this.$data.list = data.data.data
                    })
    }
}
</script>
