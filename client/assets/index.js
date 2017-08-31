var url = 'http://api.beeshare.web.id/posting'
new Vue ({
  el: '#app',
  data: {
    lists: [],
    code: '',
    files: {
      file: '',
      name: '',
      desc: ''
    },
    loginstate: true,
    regisstate: false,
    idlogin: '',
    regis: {
      name: '',
      username: '',
      password: ''
    },
    login: {
      username: '',
      password: ''
    },
    userid: localStorage.getItem('id'),
    nama: localStorage.getItem('name')
  },
  methods: {
    getcode(id) {
      this.code = this.lists[id].imgurl 
    },
  getdata() {
      console.log('test');
      axios.get(`http://api.beeshare.web.id/posting/user/${this.userid}`)
      .then(Response => {
        this.lists = Response.data
        console.log(this.lists);
      })
      .catch(err => res.send(err))
    },
  getimage(data) {
      console.log(data);
      if (data.type == 'jpg') {
        return data.imgurl
      }
      if (data.type == 'pdf') {
        return './assets/images/pdf.png'
      }
      if (data.type == 'docx') {
        return './assets/images/docx.png'
      } if (data.type == 'doc') {
        return './assets/images/docx.png'
      }
      if (data.type == 'rar') {
        return './assets/images/rar.png'
      }
      if (data.type == 'ai') {
        return './assets/images/ai.png'
      }
      if (data.type == 'ppt') {
        return './assets/images/ppt.png'
      }
      if (data.type == 'pptx') {
        return './assets/images/ppt.png'
      }
      if (data.type == 'mp4') {
        return './assets/images/mp4.png'
      }
      if (data.type == 'txt') {
        return './assets/images/txt.png'
      }
      if (data.type == 'zip') {
        return './assets/images/zip.png'
      }
      if (data.type == 'xls') {
        return './assets/images/xls.png'
      }
      if (data.type == 'xlsx') {
        return './assets/images/xls.png'
      }
      if (data.type == 'html') {
        return './assets/images/html.png'
      }
      if (data.type == 'mp3') {
        return './assets/images/mp3.png'
      } else {
        return './assets/images/other.png'
      }
    },
    appendfile(e) {
      var data = e.target.files || e.dataTransfer.files;
      this.files.file = data[0]
    },
    uploadfile() {
      var data = new FormData();
      data.append('file', this.files.file);
      data.append('name', this.files.name);
      data.append('description', this.files.desc);
      axios.post('http://api.beeshare.web.id/upload', data, {
        headers: {
          token: localStorage.getItem('token'),
          id: this.userid
        }
      })
      .then(datas => {
        this.lists.push(data)
      })
      this.files.file = '',
      this.files.name = '',
      this.files.desc = ''
      .catch(err => console.log(err))
    },
    signup() {
      axios.post('http://api.beeshare.web.id/signup', this.regis)
    },
    signin() {
      axios.post('http://api.beeshare.web.id/signin', this.login)
      .then(data => {
        console.log(data)
        localStorage.setItem('token', data.data.token),
        localStorage.setItem('id', data.data.id),
        localStorage.setItem('name', data.data.name),
        window.location.href="file.html"
      })
    },
    paketlogin() {
      this.loginstate = false,
      this.regisstate = true
    },
    paketregis() {
      this.loginstate = true,
      this.regisstate = false,
      this.signup()
    },
    logout() {
      localStorage.clear(),
      window.location.href="file.html"
    }
  },
  created: function() {
    this.getdata()
  }
})