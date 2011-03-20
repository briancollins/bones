(function() {
  var d = document;

  d.addEventListener("DOMContentLoaded", function() {
    var Cell = function(pitch) {
      this.el = this.createEl();
    };

    var colorForLevel = function(lvl) {
      switch (lvl) {
        case 5: return '#666';
        case 4: return '#777';
        case 3: return '#888';
        case 2: return '#999';
        case 1: return '#bbb';
        case 0: return '#fff';
      }
    }

    Cell.prototype.createEl = function() {
      var el = d.createElement('div'),
      s = el.style;
      s.backgroundColor = colorForLevel(5);
      s.cursor          = 'pointer';
      s.width =
        s.height        = '20';
      s.margin          = '2';
      s.cssFloat        = 'left';
      return el;
    };


    Cell.prototype.pulse = function(lvl) {
      this.el.style.backgroundColor = colorForLevel(lvl);
    };

    var body = d.body;
    s = body.style;
    s.margin          = '5';
    s.backgroundColor = '#222';


    var i;
    var cols = [];
    for (i = 0; i < 20; i++) {
      var colDiv = d.createElement('div'),
      col = [],
      st = colDiv.style;

      cols.push(col);
      st.cssFloat = 'left';
      st.width = '24';
      st.height = '220';

      var j;
      for (j = 0; j < 10; j++) {
        var c = new Cell(1);
        colDiv.appendChild(c.el);
        col.push(c);
      }

      body.appendChild(colDiv);
    }

    i = 0;
    setInterval(function() {
      i ++;
      if ( i > 20 ) {
        i = 0;
      }

      var j;
      for (j = i - 5; j <= i; j++) {
        var k;
        for (k = 0; k < 10; k++) {
          cols[j < 0 ? j + 20 : j][k].pulse(i - j);
        }
      }
    }, 70);
  });
})();
