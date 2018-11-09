<template>
    <div>
        <div class="nav container_padding">
            <h1><a href="#">简拾</a></h1>
        </div>
        <div class="main">
            <div class="news_sum container_padding">
            <div class="inner">
                <div class="date"><span>{{date}}</span><span>{{ count }}</span></div>
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
                <span v-on:click="changelists('back')" class="news_list_today" v-if="toggleButton">&larr; 后一日</span>
                <span v-on:click="changelists('forward')">前一日 &rarr;</span>
            </div>
        </div>
        </div>
        <div class="footer container_padding">
            <span>Copyright &copy; 2014 - 2018 简拾, All Rights Reserved.&nbsp;</span>
            <a href="http://yuren.io/" target="_blank">联系作者</a>
        </div>
    </div>
</template>

<style lang="less">
@navBg: #f28979;
@newsSumBg: #50b8d9;
@containerColor: #717171;
@boderColor: #eeeee0;
@footerBg: #2d2930;
@footerAColor: #428bca;
@footerAColorHover: #2a6496;
@toggleBgHover: #eee;

@import url("../less/base.less");

.nav {
  width: 100%;
  background: @navBg;
  margin-bottom: 50px;
  padding-top: 20px;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
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

.main {
  padding-left: constant(safe-area-inset-left);
  padding-left: env(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  padding-right: env(safe-area-inset-right);
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
}

.footer {
  height: 80px;
  background: @footerBg;
  color: #fff;
  text-align: center;
  font-size: 14px;
  padding-top: 20px;
  bottom: 0;
  width: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
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
/* eslint-disable */
export default {
  data: () => {
    return {
      list: [],
      date: "",
      toggleButton: false,
      index: 0,
      count: 0,
      lastId: null,
      lock: true
    };
  },
  methods: {
    changelists(num) {
      switch (num) {
        case "back":
          this.$data.index -= 1;
          break;
        case "forward":
          this.$data.index += 1;
          break;
        default:
          break;
      }
      if (this.$data.index > 0) {
        this.$data.toggleButton = true;
      } else {
        this.$data.toggleButton = false;
      }
      this.$data.list = [];
      scroll(0, 0);
      let date = this.getDay(this.$data.index);
      this.getLists(date);
      this.getMsgLength();
      window.onscroll = this.scrollEvent;
    },

    getDay(days = 0) {
      let date = new Date(new Date() - 1000 * 60 * 60 * 24 * days);
      let year = date.getFullYear();
      let month = this.formatDate(date.getMonth() + 1);
      let day = this.formatDate(date.getDate());
      this.$data.date = year + "-" + month + "-" + day;
      return year + "-" + month + "-" + day;
    },

    getLists(date, lastId) {
      if (lastId) {
        this.$http
          .get("/jianshi-backend/data.php?date=" + date + "&last_id=" + lastId)
          .then(res => {
            if (res.data.data.length === 0) {
              return;
            }
            this.$data.lock = true;
            this.$data.list = this.$data.list.concat(res.data.data);
            this.$data.lastId = res.data.data[res.data.data.length - 1].id;
          });
      } else {
        this.$http.get("/jianshi-backend/data.php?date=" + date).then(res => {
          if (res.data.data.length === 0) {
            return;
          }
          this.$data.list = res.data.data;
          this.$data.lastId = res.data.data[res.data.data.length - 1].id;
        });
      }
    },

    formatDate(day) {
      if (day < 10) {
        return "0" + day;
      } else {
        return day;
      }
    },

    getMsgLength: function() {
      let date = this.getDay(this.$data.index);
      this.$http.get("/jianshi-backend/count.php?date=" + date).then(res => {
        this.$data.count = res.data.count;
      });
    },

    scrollEvent() {
      let scrollTop = document.documentElement.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let offsetHieght = document.documentElement.offsetHeight;
      if (offsetHieght - clientHeight - scrollTop <= 300) {
        if (this.$data.lock) {
          this.$data.lock = false;
          this.getLists(this.$data.date, this.$data.lastId);
        }
      }
    }
  },
  created() {
    this.getLists(this.getDay());
    this.getMsgLength();
    window.onscroll = this.scrollEvent;
  }
};
</script>
