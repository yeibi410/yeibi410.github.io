const productArr={
    "drink1" : {'name':"코카콜라",'count':0,'price':2100 },
    "drink2" : {'name':'사이다','count':0,'price':2000 },
    "drink3" : {'name':'마운틴듀','count':0,'price':1500 },
    "drink4" : {'name':'포카리스웨트','count':0,'price':1200 },
    "drink5" : {'name':'게토레이','count':0,'price':1300 },
    "drink6" : {'name':'코코팜','count':0,'price':1900 },
    "drink7" : {'name':'봉봉','count':0,'price':1700 },
    "drink8" : {'name':'갈아만든배','count':0,'price':1800 },
    "drink9" : {'name':'트레비','count':0,'price':1000 } 
};

function orderList(productName,productPrice){
    $.each(productArr, function(index, item){
            if(productName == item.name){
                //누른 것과 productArr의 index(ex도넛1) 둘이 매치가 될 경우

                if(item.count == 0){
                    item.count = countPlus(item.count);
                    let tempStringS = `
                        <section>
                            <span class="product-name">${productName}</span>
                            <div class="list-count-btn" id="${index}">
                                <span id="minusBtn" class="${index}-minus-btn">-</span>
                                <span class="product-count">${item.count}</span>
                                <span id="plusBtn" class="${index}-plus-btn">+</span>
                            </div>
                            <div class="product-price" id="${index}">
                                `;
                            tempStringS+=`<span class="product-total-price">`;
                            tempStringS+=commaFunc(productPrice)+'</span>';

                            tempStringS+=`
                                <span>원</span>
                                <span id="delBtn" class="${index}-del-btn">x</span>
                            </div>
                        </section>
                    `;
                    $('.list-product').append(tempStringS);
                    console.log(tempStringS);
                } else if(item.count>0){
                    //카운트증가
                    this.count = countPlus(this.count);

                    //계산한걸 담기
                    let productPriceT = orderPrice(item.count, item.price);
                    
                    //증가한걸넣기
                    $('#'+index+'>.product-count').html(this.count);
                    $('#'+index+'+ div > .product-total-price').html(commaFunc(productPriceT));
                }
            }             
    });
    totalCountFunc();
    totalPriceFunc();
}

//더하기 빼기 함수
function plusMinusFunc(eID, thisId, targetCN){
    switch(eID){
        case 'plusBtn':
            // e.target id 가 플러스인 경아
            $.each(productArr, function(index, item){
                if(index == thisId){
                    // index == donut1 과 방금 누른 아이디가 donut1이 같은경우
                    // count를 증가시킴
                    // 개수와 가격을 productPriceT 담음
                    this.count = countPlus(this.count);
                    let productPriceT = orderPrice(item.count, item.price);
                    $('#'+index+'>.product-count').html(this.count);
                    $('#'+index+'+ div > .product-total-price').html(commaFunc(productPriceT));
                }
            });
        break;

        case 'minusBtn':
            $.each(productArr, function(index, item){
                if(index == thisId){
                    if(this.count > 1){
                        this.count = countMinu(this.count);
                        let productPriceT = orderPrice(item.count, item.price);

                        $('#'+index+'>.product-count').html(this.count);
                        $('#'+index+'+ div > .product-total-price').html(commaFunc(productPriceT));
                    }else{
                        // 0이되니까 삭제해야됨
                        this.count = countMinu(this.count);
                        // console.log(this.count);
                        $('.'+targetCN).parent().parent().remove();
                    }
                }
            });
        break;

        case 'delBtn':
            $.each(productArr, function(index, item){
                if(index == thisId){
                    this.count = delCount(this.count);
                    let productPriceT = orderPrice(item.count, item.price);
                    console.log(targetCN);
                    $('.'+targetCN).parent().parent().remove();
                }
            });
        break;

    }
    totalCountFunc();
    totalPriceFunc();
}

// --------------------------------------------------------------------------->   함수 모음 Start
//카운트 올려주는 함수
function countPlus(count){
    count++;
    return count;
}
// 카운트 내리는 함수
function countMinu(count){
    count--;
    return count;
}
//카운터 0으로 만들어주는 함수 삭제 버튼
function delCount(count){
    count = 0;
    return count;
}

// 개별 가격 겨산하는 함수
function orderPrice(count, price){
    orderpay = count*price
    return orderpay
}


// 뒤에서 세번째에 , 붙히는 정규식
function commaFunc(target_number){
    let temp_target = String(target_number);
    let comma_regex = /\B(?=(\d{3})+(?!\d))/g;
    return temp_target.replace(comma_regex,",");
}
//콤마 숫자로 변환 ㅠㅠ
function stringNumberToInt(stringNumber){
    return parseInt(stringNumber.replace(/,/g , ''));
}

// 전체 카운터 계산하는 함수
function totalCountFunc(){
    let productCountClass = document.getElementsByClassName('product-count');
    let tempF =[];
    for(let i =0; i<productCountClass.length;i++){
        tempF.push(parseInt(productCountClass[i].innerHTML));
    }
    if(tempF != 0){
        const totalCount = tempF.reduce((a,b) => (a+b));
        $('.total-count').html(totalCount);    
    }else if(tempF == 0){
        $('.total-count').html(0);
    }
}
// 전체 금액 계산하는 함수
function totalPriceFunc(){
    let productTotalPriceClass = document.getElementsByClassName('product-total-price');
    let tempF =[];
    for(let i =0; i<productTotalPriceClass.length;i++){
        tempF.push(stringNumberToInt(productTotalPriceClass[i].innerHTML));
    }
    if(tempF != 0){
        const totalPrice = tempF.reduce((a,b) => (a+b));
        $('.total-price').html(commaFunc(totalPrice));
    }else if(tempF == 0){
        $('.total-price').html(0);
    }
    $('.totalAmount').val(stringNumberToInt($('.total-price').html())); //지불 할 금액
}


//지불 금액한 넣어주는 함수
function moneyPayment(moneyKind){
    $('.total-money').text(commaFunc(stringNumberToInt($('.total-money').text()) + stringNumberToInt(moneyKind)));
}

function changeCalculator(totalAmount,totalPay){
    let change = totalPay-totalAmount;

    let moneyArray = document.getElementsByClassName('chang-money');
    let moneyKindArray = [50000,10000,5000,1000,500,100];

    for(let i =0; i<moneyKindArray.length;i++){
        moneyArray[i].innerHTML= moneykindFunc(moneyKindArray[i]);
    }

    function moneykindFunc(moneyKind){
        tempMoney=Math.floor(change/moneyKind);
        change = change-moneyKind*tempMoney;
        
        return tempMoney
    }
}
//팝업 function
function popupFunc(result, htmlText){
    switch(result){
        case 'success':
            $('.popup-bg').css('display','block');
            $('.change-popup-box').css('display','block');
        break;
        case 'fail':
            $('.popup-bg').css('display','block');
            $('.popup-text').css('display','block');
            $('.popup-text > span').html(htmlText);
        break;
        case 'overMoney':
            $('.popup-bg').css('display','block');
            $('.popup-text').css('display','block');
            $('.popup-text > span').html(htmlText);
            $('.popup-text > .close-btn').addClass(result);
        break;
    }

}

// --------------------------------------------------------------------------->  함수 모음 END



// --------------------------------------------------------------------------->  바로 실행 Start
$(function(){ 
    $('.click-event').on('click',function(){
        let productName = $(this).children('.drink-img + li').children('span').html();
        let productPrice = $(this).children('.drink-img + li').next('li').children('span').html();
        console.log(productPrice)
        // 부모의 아이디 읽어옴 orderlist에서 ${index}넣은 이유
        orderList(productName,productPrice);
    });

    // 돈 눌렀을 때
    $('.money-list').on('click',function(){
        moneyPayment($(this).html());
        $('.totalPay').val(stringNumberToInt($('.total-money').text())); // 지불 한 금액
    });

    // 지불 버튼 눌렀을 때 유효성
    $('.payment-btn').on("click",function(){
        let totalAmount = parseInt($('.totalAmount').val());
        let totalPay =  parseInt($('.totalPay').val());
        let changeMoney = commaFunc(totalPay-totalAmount);
        $('.change-money-text').html(changeMoney);

        if(isNaN(totalAmount) || totalAmount ==0){
            popupFunc('fail','물건을 선택해주세요.');
        }else if(isNaN(totalPay) || totalPay ==0){
            popupFunc('fail','돈을 지불해주세요.');
        }else if(totalAmount > totalPay){
            popupFunc('fail','지불 가격이 부족합니다.'); //물건 값 보다 적게 줬을 때
        }else if(totalPay-totalAmount > 50000){
            popupFunc('overMoney','지불한 금액이 너무 많습니다.'); // 물건 값 보다 50000원 더 줬을 때
        }else if(totalAmount < totalPay){
            changeCalculator(totalAmount,totalPay);
            popupFunc('success');
        }else if(totalAmount == totalPay){
            changeCalculator(totalAmount,totalPay);
            popupFunc('success');
        }
    });
    // 초기화 버튼
    $('.clear-btn').on('click',function(){
        $.each(productArr, function(index,item){
            item.count=0;
        });
        $('.list-product').html('');
        $('.total-count').html(0);
        $('.total-price').html(0);
        $('.total-money').html(0);
        $('.totalAmount').val(0);
        $('.totalPay').val(0);
        $('.close-btn').removeClass("overMoney");

    });

    // 플러스 마이너스 버튼 눌렀을 때
    $(document).on('click',function(e){
        if (e.target.id =='plusBtn' || e.target.id =='minusBtn' ||  e.target.id =='delBtn'){
            // 누른거의 클래스 네임을 읽어옴
            // 부모의 아이디 읽어옴 orderlist에서 ${index}넣은 이유
            let targetCN = e.target.className;
            let thisId = $('.'+targetCN).parent().attr('id');
            plusMinusFunc(e.target.id,thisId,targetCN); //플마 계산 함수 호출
        }
    });
    
    $('.close-btn').on("click",function(){
        if($(this).hasClass("overMoney")){
            $('.total-money').html(0);
            $('.totalPay').val(0);
        };
        $(this).parent().css("display","none");
        $(this).parent().next().css("display","none");
        $('.popup-bg').css('display','none');
        
    });
    $('.reset-btn').on('click',function(){
        location.href="./index.html";
    });

    
});
// --------------------------------------------------------------------------->  바로 실행 END