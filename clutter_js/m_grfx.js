class M_Grfx {
  constructor(sel) {
    this.sel = sel;

    this.mode = 0;

    var gOptionCount3D = 2;
    this.select3D = 0;

      var rs = random(gOptionCount * 10);
      this.mode = 0;

      if(rs< 1 *10){
        pgG_star1(sel);
      } else if(rs < 2 * 10){
        pgG_star2(sel);
      } else if(rs < 3 * 10){
        pgG_star3(sel);
      } else if(rs < 4 * 10){
        pgG_star4(sel);
      } else if(rs < 5 * 10){
        pgG_spray1(sel);
      } else if(rs < 6 * 10){
        pgG_spray2(sel);
      } else if(rs < 7 * 10){
        pgG_gradient1(sel);
      } else if(rs < 8 * 10){
        pgG_gradient2(sel);
      } else if(rs < 9 * 10){
        pgG_gradient3(sel);
      } else if(rs < 10 * 10){
        pgG_gradient4(sel);
      } else if(rs < 11 * 10){
        pgG_gradient5(sel);
      } else if(rs < 12 * 10){
        pgG_scribble1(sel);
      } else if(rs < 13 * 10){
        pgG_scribble2(sel);
      } else if(rs < 14 * 10){
        this.mode = 1;
        m_3Dgrfx[this.sel] = new M_Ring(this.sel);
      } else if(rs < 15 * 10){
        this.mode = 1;
        m_3Dgrfx[this.sel] = new M_Cloud(this.sel);
      } else if(rs < 16 * 10){
        this.mode = 1;
        m_3Dgrfx[this.sel] = new M_Cosmic(this.sel);
      } else if(rs < 17 * 10){
        this.mode = 1;
        m_3Dgrfx[this.sel] = new M_Sphere(this.sel);
      }
  }

  display(){
    if(this.mode==0){
      push();
        translate(circ[this.sel].body.position.x, circ[this.sel].body.position.y);
        translate(-pg_grfx[this.sel].width/2, -pg_grfx[this.sel].height/2);
        image(pg_grfx[this.sel], 0, 0);
      pop();
    } else {
      m_3Dgrfx[this.sel].display();
      if(m_3Dgrfx[this.sel].glideWindow < 90){
        m_3Dgrfx[this.sel].glide();
      }
    }
  }
}
