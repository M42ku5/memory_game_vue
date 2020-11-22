let app = new Vue({
  el: "#app",
  data: {
    cards: [
      {
        name: "bug",
        img: "bug.jpg",
      },
      {
        name: "cat",
        img: "cat.jpg",
      },
      {
        name: "coala",
        img: "coala.jpg",
      },
      {
        name: "dog",
        img: "dog.jpg",
      },
      {
        name: "elephant",
        img: "elephant.jpg",
      },
      {
        name: "fox",
        img: "fox.jpg",
      },
      {
        name: "owl",
        img: "owl.jpg",
      },
      {
        name: "panda",
        img: "panda.jpg",
      },
      {
        name: "piglet",
        img: "piglet.jpg",
      },
      {
        name: "tiger",
        img: "tiger.jpg",
      },
    ],
    memoryCards: [],
    flippedCards: [],
    finish: false,
    start: false,
    turns: 0,
    totalTime: {
      minutes: 0,
      seconds: 0,
    },
  },
  created() {
    this.resetsGame();
  },
  computed: {
    formatsSeconds() {
      if (this.totalTime.seconds < 10) {
        return "0" + this.totalTime.seconds;
      }
      return this.totalTime.seconds;
    },
    formatsMinutes() {
      if (this.totalTime.minutes < 10) {
        return "0" + this.totalTime.minutes;
      }
      return this.totalTime.minutes;
    },
  },
  methods: {
    flipsCard(card) {
      // iterated the number of turns each time the function is called
      this.turns++;

      // This condition prevents the game logic from breaking if the user clicks on the cards too quickly so that not more than two cards can be turned at once.

      if (card.isMatched || card.isFlipped || this.flippedCards.length === 2) {
        return;
      }

      if (!this.start) {
        this.startsGame();
      }

      card.isFlipped = true;

      if (this.flippedCards.length < 2) {
        this.flippedCards.push(card);
      }

      if (this.flippedCards.length === 2) {
        this.matchesCards(card);
      }
    },

    matchesCards(card) {
      if (this.flippedCards[0].name === this.flippedCards[1].name) {
        setTimeout(() => {
          this.flippedCards.forEach((card) => (card.isMatched = true));
          this.flippedCards = [];

          //checks if all cards are matched
          if (this.memoryCards.every((card) => card.isMatched === true)) {
            clearInterval(this.interval);
            this.finish = true;
          }
        }, 400);
      } else {
        setTimeout(() => {
          this.flippedCards.forEach((card) => {
            card.isFlipped = false;
          });
          this.flippedCards = [];
        }, 800);
      }
    },
    startsGame() {
      this.updatesTime();
      this.interval = setInterval(this.updatesTime, 1000);
      this.start = true;
    },

    updatesTime() {
      if (this.totalTime.seconds !== 59) {
        this.totalTime.seconds++;
        return;
      }

      this.totalTime.minutes++;
      this.totalTime.seconds = 0;
    },

    // Function sets values to initial state. It is called before game can start and also returns game to initial state after it is completed by user.
    resetsGame() {
      clearInterval(this.interval);

      this.cards.forEach((card) => {
        Vue.set(card, "isFlipped", false);
        Vue.set(card, "isMatched", false);
      });

      // The use of 'shuffle' and 'cloneDeep' from lodash library simplifies/shortens the code and handling of the cards array.
      setTimeout(() => {
        this.memoryCards = [];
        this.memoryCards = _.shuffle(
          this.memoryCards.concat(
            _.cloneDeep(this.cards),
            _.cloneDeep(this.cards)
          )
        );
        this.totalTime.minutes = 0;
        this.totalTime.seconds = 0;
        this.start = false;
        this.finish = false;
        this.turns = 0;
        this.flippedCards = [];
      }, 0);
    },
  },
});