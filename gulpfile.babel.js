//Constantes para el automatizador de tareas
const gulp = require("gulp")
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const plumber = require("gulp-plumber")

//import postcss

const postcss = require('gulp-postcss')
const autoprefixer = require ('gulp-autoprefixer')
const zIndex = require('postcss-zindex')
const pseudoelements = require('postcss-pseudoelements')
const nthChild = require('postcss-nth-child-fix')



const browserSync = require('browser-sync')


const servidor = browserSync.create()
const production = false

//opciones
const sassOptionsDesarrollo={
  includePaths:['node_modules'],
  sourceComments:true,
  outputStyle:'expanded'
}
const sassOptionsProduccion = {
  includePaths:['node_modules'],
  outputStyle:'compressed'
}
const postCssPlugins =[
  autoprefixer({//añade prefijos propietarios en los navegadres no actualizados
    browsers:['last 3 versions']
  }),
  zIndex(),//rebase de los zindex positivos de css 
  pseudoelements(),//corrige los errores de los pseudoelementos de internet explorer 8
  nthChild()//corrige un fallo en android 4 
]


//tareas gulp
gulp.task('pug', () => {
  return gulp.src('./dev/pages/*.pug')//origen de archivo
    .pipe(plumber())
    .pipe(pug({
      pretty: true //opciones de funcion de compilado
    }))
    .pipe(gulp.dest('./public/'))// destino de compilacion
})

gulp.task('stylesDev',()=>{
  return gulp.src('./dev/styles.scss')
      .pipe(plumber()) //vigilar fallos sin bajar servidor
      .pipe(sass(
          sassOptionsDesarrollo
      ))
      //.pipe(postcss(postCssPlugins))
      .pipe(gulp.dest('./public/css'))
      .pipe(servidor.stream())
})
gulp.task('stylesProd',()=>{
  return gulp.src('./dev/styles.scss')
      .pipe(plumber()) //vigilar fallos sin bajar servidor
      .pipe(sass(
          sassOptionsProduccion
      ))
      .pipe(concat('styles-min.css'))
      //.pipe(postcss(postCssPlugins))
      .pipe(gulp.dest('./public/css'))
      .pipe(servidor.stream())
})

gulp.task('babel',()=>{//para transformar a version antigua de js es5
  return gulp.src('./dev/*.js')
      .pipe(plumber())
      .pipe(babel({
          presets:['@babel/preset-env'] //ya no se usa ['env']
      }))
      .pipe(concat('scripts-min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/js'))
})








//tarea default
gulp.task('default', () => {
  servidor.init({
    server: './public'
  })

  //esto es un if else modificado como en excel
  production 
  ? gulp.watch('./dev/*.scss', gulp.series('stylesProd')).on('change', servidor.reload)
  : gulp.watch('./dev/*.scss', gulp.series('stylesDev')).on('change', servidor.reload)

  //PUG
  gulp.watch('./dev/**/*.pug', gulp.series('pug')).on('change', servidor.reload)
  //gulp.watch('./dev/*.sass', gulp.series('sass')).on('change', servidor.reload)
  // JS
  gulp.watch('./dev/*.js', gulp.series('babel')).on('change', servidor.reload)
})

