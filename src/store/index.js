import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // 进入界面
    into:false,
    // 音乐的url
    // musicId: '',
    songId:'',
    // 音乐的播放状态 胶片
    isPlay: false,
    // 实时播放时长
    currentTime: 0,
    // 播放列表
    playList: [
        {
            playId:0,//歌曲的id
            playPicUrl:"",//歌曲的图片地址
            playSong:"",//歌曲的名字
            playSinger:"",//歌曲的歌手
        }
    ], 
    //当前播放的歌曲信息
    playContent: {},   
    // 搜索单曲结果列表
    searchMusicList:[
        {
            musicid:123,//歌曲的id
            song:"",
            singer:"",
            zhuanji:"",
            picUrl:"",
            time:0,//歌曲时长
        }
    ],
    // 搜索歌曲总数
    songCnt:666,//初始值666
    // 当前播放歌曲详情
    playId:0,
    playPicUrl:"",
    playSong:"",
    playSinger:"",
    // 搜索Mv结果
    searchVideos:[
        {
            userName:"",
            title:"",
            coverUrl:"",
            vid:""
        }
    ],
    // 最近播放歌曲
    lastSong:[
        {
            song:"",
            singer:"",
        }
    ],
    // 音乐播放状态
    onPlay:true,
    // 最新音乐列表
    tuiJianList:[
        {
            musicid:123,
            song:"",
            singer:[],
            // zhuanji:"",
            picUrl:"",
            time:0,
        }
    ],
    //播放MV的URL
    mvUrl:"",
    // 登录后用户信息

    // isLogin:false|| localStorage.getItem('isLogin'),
    isLogin:false|| sessionStorage.getItem('isLogin'),
    user:{
        userPic:""||sessionStorage.getItem('userPic'),
        userName:""||sessionStorage.getItem('userName'),
        // userPic:'' || localStorage.getItem('userPic'),
        // userName:'' || localStorage.getItem('userName')
    },
    isDel:false 
};

// 创建Store对象
const store = new Vuex.Store({
    state,
    mutations: {
    /********************************************************/
        //获取当前播放歌曲的信息
        setContent(state, payload) {
            state.playContent = payload
            // state.playList.indexOf(payload)==-1?state.playList.push(payload):""//改变播放列表
        },
    
        //从播放列表中移除歌曲
        removeSong(state, index) {
           
            state.playList.splice(index.index, 1)
        },
        //删除成功的标志
        removeSonged(state,isDel){
            state.isDel=isDel.isDel;
        },
        //往播放列表中加入歌曲
        addSong(state, payload) {
            let index = state.playList.indexOf(payload)
            state.playList.indexOf(payload)==-1?state.playList.push(payload):""
        },
        //用户登录状态修改
        changeIsLogin:(state,isLogin)=>{
            state.isLogin=isLogin.isLogin;
            // localStorage.setItem('isLogin', isLogin.isLogin);
            sessionStorage.setItem('isLogin', isLogin.isLogin);
        },
        //获取登录后的用户信息
        //localStorage：除非被清除，否则永久保存
        // sessionStorage：仅在当前会话下有效，关闭页面或浏览器后被清除
        changeUser:(state,user)=>{
            state.user.userPic=user.user.userPic;
            state.user.userName=user.user.userName;
            // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
            // localStorage.setItem('userPic', user.user.userPic);
            // localStorage.setItem('userName', user.user.userName);
            sessionStorage.setItem('userPic', user.user.userPic);
            sessionStorage.setItem('userName', user.user.userName);
        },
        //播放视频URL
        boFangMV(state,mvUrl){
            state.mvUrl=mvUrl.mvUrl;
        },
        //获取搜索单曲总数
        searchCnt(state,songCnt){
                state.songCnt=songCnt.songCnt;
        },
        //获取搜索单曲结果
        searchMusic(state,searchMusic){
            state.searchMusicList.push(searchMusic.musicList)
            // state.searchMusicList=searchMusic;
        },
        //添加到最近播放列表
        addLastSong(state,lastSong){
            state.searchMusicList.push(lastSong.lastSongList)
            // state.searchMusicList=searchMusic;
        },
        //搜索MV
        searchVideos(state,searchVideos){
            state.searchVideos.push(searchVideos.videoList)
        },
        //当前歌曲播放时长的更新
        updateCurrentTime(state, currentTime) {
            state.currentTime = currentTime;
        },
    /********************************************************/
    },
})


// 挂载Vue实例
export default store;

