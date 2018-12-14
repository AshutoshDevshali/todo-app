var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require('method-override')
mongoose.connect("mongodb://localhost/todo_app");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

var todoSchema = mongoose.Schema({
	title: String,
	description: String,
});

var Todo = mongoose.model("Todo", todoSchema);


app.get("/todo", function(req, res){
	Todo.find({}, function(err, allTodos){
		if(err) {
			console.log(err);
		} else {
			res.render("todo", {allTodos: allTodos});
		}
	})
})

app.post("/todo/new", function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	var newTodo = {title: title, description: description};
	Todo.create(newTodo, function(err, newlyCreated){
		if(err) {
			console.log("Error while creating")
			console.log(err)
		} else {
			res.redirect("/todo");
		}
	})
})

app.delete("/todo/:id", function(req, res){
	Todo.findByIdAndDelete(req.params.id, function(err){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/todo")
		}
	})
})

app.listen(3000, function(){
console.log("Server has started");
})
