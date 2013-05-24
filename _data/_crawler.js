
var readingbooks = {};
// var totalReg = /我在读的书\((.*)\)/;
// readingbooks.total = totalReg.exec($('.user-profile-nav h1').text().trim())[1];

var itemData;
readingbooks.books = [];
$('.subject-item').each(function(idx,item){
    console.log(item);
    item = $(item);
    // $(item).find
    itemData = {
        'title': item.find('h2').text().trim().replace(/\s{2}/g,''),
        'author': item.find('.pub').text().trim().replace(/( )+/g,''),
        'cover': item.find('.pic img').attr('src'),
        'link': item.find('h2 a').attr('href'),

        'starttime': item.find('.short-note .date').text().substr(0,10),
        'description': item.find('.short-note .comment').text().trim(),
        'rating': item.find('.short-note div span').eq(0)[0].className.charAt(6)
    };
    readingbooks.books.push(itemData);
});



var seenMovies = {};
// var totalReg = /我在读的书\((.*)\)/;
// seenMovies.total = totalReg.exec($('.user-profile-nav h1').text().trim())[1];

var itemData;
seenMovies.movies = [];
$('.grid-view .item').each(function(idx,item){
    console.log(item);
    item = $(item);
    // $(item).find
    itemData = {
        'title': item.find('.title').text().trim().replace(/\s{2}/g,''),
        'author': item.find('.intro').text().trim().replace(/( )+/g,''),
        'cover': item.find('.pic img').attr('src'),
        'link': item.find('.title a').attr('href'),

        'starttime': item.find('.date').text(),
        'description': (item.find('li.clearfix').prev().has('.date') == [])?'':item.find('li.clearfix').prev().text().trim(),
        'rating': item.find('li.intro').next().find('span')[0].className.charAt(6)
    };
    seenMovies.movies.push(itemData);
});

var likeData = likeData || {};
likeData.likes = likeData.likes || [];
$('.fav-list li').each(function(idx, item){
    console.log(item);
    item = $(item);
    // $(item).find
    itemData = {
        'title': item.find('h3 a').text(),
        'link': item.find('h3 a').attr('href'),
        'abstract': item.find('.abstract').text().trim(),
        'time': item.find('.time').text().trim()
    };
    likeData.likes.push(itemData);
});


// zhihu
var answer_list = [];
$('#zh-profile-answer-list .zm-item').each(function(idx, item){
    console.log(item);
    item = $(item);
    // $(item).find
    itemData = {
        'question': item.find('h2').text(),
        'link': item.find('h2 a').attr('href'),
        'vote_count': item.find('.zm-item-vote-count').data('votecount'),
        'create_time': new Date(item.find('.zm-item-answer').data('created')).toLocaleDateString(),
        'summary':item.find('.zh-summary').text().replace('显示全部','').trim()
    };
    answer_list.push(itemData);
});

var voted_answer = [];
$('#zh-profile-activity-page-list .zm-item-answer').each(function(idx, item){
    console.log(item);
    item = $(item);
    // $(item).find
    itemData = {
        'question': item.parent().find('.question_link').text(),
        'link': item.parent().find('.question_link').attr('href'),
        // 'vote_count': item.find('.zm-item-vote-count').data('votecount'),
        'create_time': new Date(item.parent().find('.zm-item-answer').data('created')).toLocaleDateString(),
        'summary':item.find('.zh-summary').text().replace('显示全部','').trim()
    };
    voted_answer.push(itemData);
});


// thepast.me
var social_timeline = {};
social_timeline.data = [];
jQuery('.storyUnit').each(function(idx, item){
    console.log(item);
    item = jQuery(item);
    // $(item).find
    itemData = {
        'type': item.find('.from')[0].className.replace('oauth','').replace('from','').trim(),
        'created': item.find('.time').text().replace('旧时重提','').trim(),
        'retweet': item.find('p.summary').next('span').text().trim(),
        'img': item.find('.photoUnit img').attr('src')?item.find('.photoUnit img').attr('src'):'',
        'tweet': item.find('p.summary').text().trim()
    };
    social_timeline.data.push(itemData);
});