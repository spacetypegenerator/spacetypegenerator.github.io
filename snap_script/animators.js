function sinEngine(aCount, aLength, Speed, slopeN) {
  var sinus = sin((frameCount*Speed + aCount*aLength));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}

function aSet(ticker, influ){          // takes a 0 - 1 and returns an eased 0 - 1
  var capTicker = ticker%1;
  var targetPoint = pow(capTicker,influ)/(pow(capTicker,influ) + pow(1-capTicker,influ));
  return targetPoint;
}

function aSet2(ticker, influ){  /// takes a 0 - 1 and returns an eased 0 - 1 then 1 to 0
  var nowTicker = ticker;

  var targetPoint = 0;
  if(nowTicker<=0.5){
    var thisTicker = map(nowTicker, 0, 0.5, 0, 1);
    targetPoint = pow(thisTicker,influ)/(pow(thisTicker,influ) + pow(1-thisTicker,influ));
  } else if(nowTicker<=1){
    var thisTicker = map(nowTicker, 0.5, 1, 1, 0);
    targetPoint = pow(thisTicker,influ)/(pow(thisTicker,influ) + pow(1-thisTicker,influ));
  }

  return targetPoint;
}

function aSet3(ticker, influ){          // takes a 0 - 1 and returns an eased 0 - 1 and then 1 – 2 and then 2 – 3, etc
  var culmTicker = floor(ticker/1);
  var capTicker = ticker%1;

  var targetPoint = culmTicker + pow(capTicker,influ)/(pow(capTicker,influ) + pow(1-capTicker,influ));

  return targetPoint;
}
