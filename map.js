var HOME_PATH = window.HOME_PATH || '.';

// 설정한 위도와 경도, 줌 레벨에 맞는 위치를 센터로 잡아서 제공
var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(36.3494029, 127.3768244),
    zoom: 15,
    zoomControl: true,
        zoomControlOptions: {
            style: naver.maps.ZoomControlStyle.SMALL,
            position: naver.maps.Position.TOP_RIGHT
        }
});

// 마커들의 위치 정보를 배열로 정의
var markerPositions = [
    new naver.maps.LatLng(36.3494029, 127.3768244), // 학원
    new naver.maps.LatLng(36.3024808, 127.3354944), // 웰케어 동물병원
];

// 마커를 담을 배열 생성
var markers = [];

// 각 위치에 마커 생성 및 지도에 추가
for (var i = 0; i < markerPositions.length; i++) {
    var marker = new naver.maps.Marker({
        position: markerPositions[i],
        map: map
    });
    
    // 생성한 마커를 배열에 추가
    markers.push(marker);
}

// 정보 데이터 배열. 각 객체는 마커와 정보 창에 표시될 내용을 포함합니다.
var locations = [
    {
        name: 'SBS아카데미 컴퓨터 학원',
        lat: 36.3494029,
        lng: 127.3768244,
        address: '대전 서구 대덕대로 179 굿모닝어학원빌딩 9층 sbs아카데미컴퓨터아트학원 대전점',
        phone: '042-719-8383',
        info: '학원 > 컴퓨터',
        website: 'http://daejeon.sbsart.com/'
    },
    {
        name: '웰케어 동물병원',
        lat: 36.3024808, 
        lng: 127.3354944,
        address: '대전 서구 관저북로13번길 23-12 1층',
        phone: '0507-1422-2475',
        info: '동물병원',
        website: 'http://www.naver.com/'
    },
    // ... (100개 이상의 정보를 추가)
];

// 반복문을 사용하여 마커와 정보 창을 생성
for (var i = 0; i < locations.length; i++) {
    var location = locations[i];

    // 각 위치에 대한 정보 창 내용 생성
    var contentString = [
        '<div class="iw_inner">',
        '   <h3>' + location.name + '</h3>',
        '   <p>' + location.address + '<br />',
        '       ' + location.phone + ' | ' + location.info + '<br />',
        '       <a href="' + location.website + '" target="_blank">' + location.website + '</a>',
        '   </p>',
        '</div>'
    ].join('');

    // 각 마커에 클릭 이벤트 리스너를 추가하여 정보 창 열기
    naver.maps.Event.addListener(marker, "click", (function(content) {
        return function() {
            var infowindow = new naver.maps.InfoWindow({
                content: content
            });
            infowindow.open(map, marker);
        };
    })(contentString)); // 클로저를 사용하여 반복문 변수를 보호
}

// naver.maps.Event.addListener(marker, "click", function(e) {
//     if (infowindow.getMap()) {
//         infowindow.close();
//     } else {
//         infowindow.open(map, marker);
//     }
// });

// infowindow.open(map, marker);

// 정보 창의 커스터마이징
var sbsAcademyContentInfo = new naver.maps.InfoWindow({
    content: contentString,
    // 배경색
    backgroundColor: "#FFF",
    // 테두리색
    borderColor: "#A5C8A0",
    // 테두리 두께
    borderWidth: 2
});