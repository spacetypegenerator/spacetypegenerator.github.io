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

function easeInOutSine(ticker) {
  return -(Math.cos(Math.PI * ticker) - 1) / 2;
}
  

function easeInQuad(ticker) {
  return ticker * ticker;
}

function easeOutQuad(ticker) {
  return 1 - (1 - ticker) * (1 - ticker);
}

function easeInOutQuad(ticker) {
  return ticker < 0.5
    ? 2 * ticker * ticker
    : 1 - Math.pow(-2 * ticker + 2, 2) / 2;
  }

function easeOutQuint(ticker){
  return 1 - Math.pow(1 - ticker, 5);
}

function easeInQuint(ticker) {
  return ticker * ticker * ticker * ticker * ticker;
}

function easeInOutQuint(ticker) {
  return ticker < 0.5 
    ? 16 * ticker * ticker * ticker * ticker * ticker
    : 1 - Math.pow(-2 * ticker + 2, 5) / 2;
  }

function easeOutCirc(ticker){
  return sqrt(1 - Math.pow(ticker - 1, 2));
}

function easeInCirc(ticker){
  return 1 - Math.sqrt(1 - Math.pow(ticker, 2));
}

function easeInOutCirc(ticker) {
  return ticker < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * ticker, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * ticker + 2, 2)) + 1) / 2;
  }

function easeInOutBack(ticker) {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return ticker < 0.5
    ? (Math.pow(2 * ticker, 2) * ((c2 + 1) * 2 * ticker - c2)) / 2
    : (Math.pow(2 * ticker - 2, 2) * ((c2 + 1) * (ticker * 2 - 2) + c2) + 2) / 2;
}

function easeOutBounce(ticker) {
  const n1 = 7.5625;
  const d1 = 2.75;
  
  if (ticker < 1 / d1) {
      return n1 * ticker * ticker;
  } else if (ticker < 2 / d1) {
      return n1 * (ticker -= 1.5 / d1) * ticker + 0.75;
  } else if (ticker < 2.5 / d1) {
      return n1 * (ticker -= 2.25 / d1) * ticker + 0.9375;
  } else {
      return n1 * (ticker -= 2.625 / d1) * ticker + 0.984375;
  }
}

function easeOutElastic(ticker) {
  const c4 = (2 * Math.PI) / 3;
  
  return ticker === 0
    ? 0
    : ticker === 1
    ? 1
    : Math.pow(2, -10 * ticker) * Math.sin((ticker * 10 - 0.75) * c4) + 1;
  }

function easeInOutElastic(ticker) {
  const c5 = (2 * Math.PI) / 4.5;
  
  return ticker === 0
    ? 0
    : ticker === 1
    ? 1
    : ticker < 0.5
    ? -(Math.pow(2, 20 * ticker - 10) * Math.sin((20 * ticker - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * ticker + 10) * Math.sin((20 * ticker - 11.125) * c5)) / 2 + 1;
  }
