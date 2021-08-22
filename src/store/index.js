import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // 进入界面
    into:false,
    // 音乐的url
    musicId: '',
    songId:'',
    // 音乐的播放状态
    isPlay: false,
    // 当前播放的歌单
    musicList: [],
    // 当前播放歌单的id
    musicListId: '',
    // 是否登录
    isLogin: false,
    // 当前播放音乐的索引
    currentIndex: -1,
    // 音乐详情卡片的显隐
    isMusicDetailCardShow: false,
    // 实时播放时长
    currentTime: 0,
    // 音乐是否在加载中
    isMusicLoad: false,
    // 在歌手详情保存的上一首歌曲信息
    currentRowInfo: {},
    // 用户喜欢的音乐列表
    likeMuiscList: [],
    // 已收藏的歌单
    // 已收藏的专辑
    subAlbumList: null,
    // 已收藏的歌手
    subSingerList: null,
    // 已收藏的video
    subVideoList: null,
    // 已收藏的歌单
    collectMusicList: [],
    // 用户创建的歌单
    createdMusicList: [],
    // 要下载的音乐信息
    downloadMusicInfo: {
        name: '',
        url: '',
    },
    // 已喜欢的视频
    likeVideoList: null,
    /********************************************************/
    // 播放列表
    playList: [
        {
            playId:0,
            playPicUrl:"",
            playSong:"",
            playSinger:"",
        }
    ], 
    playContent: {},   //当前播放的歌曲信息
    current: "" , //当前歌曲的播放进度

    // 搜索单曲结果列表
    searchMusicList:[
        {
            musicid:123,
            song:"",
            singer:"",
            zhuanji:"",
            picUrl:"",
            time:0,
        }
    ],
    // 搜索歌曲总数
    songCnt:666,
    // 播放列表信息
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
    mvUrl:"",
    // 登录后用户信息
    isLogin:false,
    user:{
        userPic:"",
        userName:""

    }
};


// 创建Store对象
const store = new Vuex.Store({
    state,
    mutations: {
        // 更新音乐url
        updateMusicId(state, musicId) {
            state.musicId = musicId;
            console.log('updateMusicId');
        },
        // 修改播放状态
        changePlayState(state, isPlay) {
            state.isPlay = isPlay;
            console.log('changePlayState');
        },
    /********************************************************/
    //获取当前播放歌曲的信息
    setContent(state, payload) {
        state.playContent = payload
        // state.playList.indexOf(payload)==-1?state.playList.push(payload):""//改变播放列表
    },
   
    //从播放列表中移除歌曲
    removeSong(state, payload) {
        let index = state.playList.indexOf(payload)
        state.playList.splice(index, 1)
    },
    //往播放列表中加入歌曲
    addSong(state, payload) {
        let index = state.playList.indexOf(payload)
        state.playList.indexOf(payload)==-1?state.playList.push(payload):""
    },

    changeIsLogin(state,isLogin){
            state.isLogin=isLogin.isLogin;
    },
        changeUser(state,user){
            
            state.user.userPic=user.user.userPic;
            state.user.userName=user.user.userName;

        },
        boFangMV(state,mvUrl){
            state.mvUrl=mvUrl.mvUrl;
        },
        searchCnt(state,songCnt){
                state.songCnt=songCnt.songCnt;
        },
        searchMusic(state,searchMusic){
            state.searchMusicList.push(searchMusic.musicList)
            // state.searchMusicList=searchMusic;
        },
        addLastSong(state,lastSong){
            state.searchMusicList.push(lastSong.lastSongList)
            // state.searchMusicList=searchMusic;
        },
        searchVideos(state,searchVideos){
            state.searchVideos.push(searchVideos.videoList)
        },

    /********************************************************/
       

        // 更新歌单列表和歌单id
        updateMusicList(state, payload) {
            // 当歌单id发生变化时,重置当前播放音乐索引
            if (payload.musicListId != state.musicListId) {
                state.musicListId = payload.musicListId;
                state.currentIndex = -1;
            }
            console.log(state.currentIndex);
            // 对歌单进行深拷贝再赋值 直接赋值是浅拷贝
            // 歌单是固定的死数据，而vuex中的musicList是动态的
            let musicList = payload.musicList.slice(0)
            state.musicList = musicList;
            console.log('updateMusicList');
        },

        //更新登录状态
        updataLoginState(state) {
            state.isLogin = !state.isLogin;
        },
        // 当前播放音乐的索引
        updateCurrentIndex(state, index) {
            console.log('updateCurrentIndex');
            state.currentIndex = index;
            console.log(state.currentIndex);
        },
        // 切换音乐详情卡片的显隐
        changeMusicDetailCardState(state) {
            state.isMusicDetailCardShow = !state.isMusicDetailCardShow;
        },
        updateCurrentTime(state, currentTime) {
            state.currentTime = currentTime;
        },
        // 更新音乐的加载状态
        updateMusicLoadState(state, isLoad) {
            state.isMusicLoad = isLoad;
        },
        // 用于记录当前播放行的信息 便于下次渲染和清除播放样式
        updateCurrentRowInfo(state, currentRowInfo) {
            state.currentRowInfo = currentRowInfo;
        },
        // 更新用户喜欢的音乐列表
        // 才发现这里拼错了 懒得改了
        updataLikeMuiscList(state, likeMuiscList) {
            state.likeMuiscList = likeMuiscList;
        },
        // 更新已收藏的专辑列表
        updateSubAlbumList(state, subAlbumList) {
            state.subAlbumList = subAlbumList;
        },
        // 更新已收藏的歌手列表
        updateSubSingerList(state, subSingerList) {
            state.subSingerList = subSingerList;
        },
        // 更新已收藏的视频列表
        updateSubVideoList(state, subVideoList) {
            state.subVideoList = subVideoList;
        },
        // 更新已收藏的歌单
        updateCollectMusicList(state, collectMusicList) {
            state.collectMusicList = collectMusicList;
        },
        // 更新用户创建的歌单
        updateCreatedMusicList(state, createdMusicList) {
            state.createdMusicList = createdMusicList;
        },
        // 更新当前下载的音乐信息
        updateDownloadMusicInfo(state, info) {
            state.downloadMusicInfo = info;
        },
        // 更新已喜欢的视频列表
        updateLikeVideoList(state, likeVideoList) {
            state.likeVideoList = likeVideoList;
        },
    },
})


// 挂载Vue实例
export default store;

// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// const state = {
//     num:5
// }

// const store = new Vuex.Store({
//     state,
//     mutations:{
//         changeNum(state,value){
//             state.num=value;
//         }
//     }
// })
// // 挂载Vue实例
// export default store;
