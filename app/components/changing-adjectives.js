import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
  	var animationDelay = 2500;
		var barAnimationDelay = 3800;
		var barWaiting = barAnimationDelay - 3000;
		var lettersDelay = 50;
		var typeLettersDelay = 150;
		var selectionDuration = 500;
		var typeAnimationDelay = selectionDuration + 800;
		var revealDuration = 600;
		var revealAnimationDelay = 1500;

  	initHeadline();

  	function initHeadline() {
  		singleLetters(Ember.$('.cd-headline.letters').find('b'));
  		animateHeadline(Ember.$('.cd-headline'));
  	}

  	function singleLetters($words) {
  		$words.each(function(){
  			var word = Ember.$(this);
  			var letters = word.text().split('');
  			var selected = word.hasClass('is-visible');

  			for (var i in letters) {
  				if (word.parents('.rotate-2').length > 0) {
            letters[i] = '<em>' + letters[i] + '</em>';
          }
  				letters[i] = (selected) ?
                       '<i class="in">' + letters[i] + '</i>' :
                       '<i>' + letters[i] + '</i>';
  			}

		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
  		});
  	}

  	function animateHeadline($headlines) {
  		var duration = animationDelay;

  		$headlines.each(function(){
  			var headline = Ember.$(this);

  			if (headline.hasClass('loading-bar')) {
  				duration = barAnimationDelay;
  				setTimeout(function() {
            headline.find('.cd-words-wrapper').addClass('is-loading');
          }, barWaiting);
  			} else if (headline.hasClass('clip')) {
  				var spanWrapper = headline.find('.cd-words-wrapper');
  				var newWidth = spanWrapper.width() + 10;
  				spanWrapper.css('width', newWidth);
  			} else if (!headline.hasClass('type') ) {
  				var words = headline.find('.cd-words-wrapper b');
  				var width = 0;

  				words.each(function(){
  					var wordWidth = Ember.$(this).width();

				    if (wordWidth > width) {
              width = wordWidth;
            }
  				});

  				headline.find('.cd-words-wrapper').css('width', width);
  			}

  			setTimeout(function(){
          hideWord(headline.find('.is-visible').eq(0));
        }, duration);
  		});
  	}

  	function hideWord($word) {
  		var nextWord = takeNext($word);

  		if ($word.parents('.cd-headline').hasClass('type')) {
  			var parentSpan = $word.parent('.cd-words-wrapper');

  			parentSpan.addClass('selected').removeClass('waiting');

  			setTimeout(function(){
  				parentSpan.removeClass('selected');
  				$word
            .removeClass('is-visible')
            .addClass('is-hidden')
            .children('i')
            .removeClass('in')
            .addClass('out');
  			}, selectionDuration);

  			setTimeout(function() {
          showWord(nextWord, typeLettersDelay);
        }, typeAnimationDelay);

  		} else if ($word.parents('.cd-headline').hasClass('letters')) {
  			var bool = $word.children('i').length >= nextWord.children('i').length;

  			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
  			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
  		}  else if ($word.parents('.cd-headline').hasClass('clip')) {
  			$word.parents('.cd-words-wrapper').animate({
          width : '2px'
        }, revealDuration, function() {
  				switchWord($word, nextWord);
  				showWord(nextWord);
  			});
  		} else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
  			$word.parents('.cd-words-wrapper').removeClass('is-loading');
  			switchWord($word, nextWord);

  			setTimeout(function() {
          hideWord(nextWord);
        }, barAnimationDelay);

  			setTimeout(function() {
          $word.parents('.cd-words-wrapper').addClass('is-loading');
        }, barWaiting);
  		} else {
  			switchWord($word, nextWord);
  			setTimeout(function() {
          hideWord(nextWord);
        }, animationDelay);
  		}
  	}

  	function showWord($word, $duration) {
  		if ($word.parents('.cd-headline').hasClass('type')) {
  			showLetter($word.find('i').eq(0), $word, false, $duration);
  			$word.addClass('is-visible').removeClass('is-hidden');
  		} else if ($word.parents('.cd-headline').hasClass('clip')) {
  			$word.parents('.cd-words-wrapper').animate({
          width: $word.width() + 10
        }, revealDuration, function() {
  				setTimeout(function() {
            hideWord($word);
          }, revealAnimationDelay);
  			});
  		}
  	}

  	function hideLetter($letter, $word, $bool, $duration) {
  		$letter.removeClass('in').addClass('out');

  		if (!$letter.is(':last-child')) {
  		 	setTimeout(function() {
          hideLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
  		} else if($bool) {
  		 	setTimeout(function() {
          hideWord(takeNext($word));
        }, animationDelay);
  		}

      var notrans = Ember.$('html').hasClass('no-csstransitions');

  		if ($letter.is(':last-child') && notrans) {
  			var nextWord = takeNext($word);
  			switchWord($word, nextWord);
  		}
  	}

  	function showLetter($letter, $word, $bool, $duration) {
  		$letter.addClass('in').removeClass('out');

  		if(!$letter.is(':last-child')) {
  			setTimeout(function() {
          showLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
  		} else {
  			if ($word.parents('.cd-headline').hasClass('type')) {
          setTimeout(function() {
            $word.parents('.cd-words-wrapper').addClass('waiting');
          }, 200);
        }
  			if (!$bool) {
          setTimeout(function() {
            hideWord($word);
          }, animationDelay);
        }
  		}
  	}

  	function takeNext($word) {
  		return !$word.is(':last-child') ?
             $word.next() :
             $word.parent().children().eq(0);
  	}

  	function switchWord($oldWord, $newWord) {
  		$oldWord.removeClass('is-visible').addClass('is-hidden');
  		$newWord.removeClass('is-hidden').addClass('is-visible');
  	}
  }
});
