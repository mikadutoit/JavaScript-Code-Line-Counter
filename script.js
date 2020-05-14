// Variables

var javaSourceFile = "https://raw.githubusercontent.com/mikadutoit/JavaScript-Code-Line-Counter/master/Input/Test1.js"; /*URL for Java Source File to be checked.*/
var textData; /* Variable to store the Source File's Text Data.*/

var n = 0; /*Number of lines of code.*/
var blockCommentCounter = 0; /*Number of block comments.*/
var lineCommentCounter = 0; /*Number of line comments.*/

var insideLineOfCode = false; /*Tracks whether or not character check is still within a Line of Code.*/
var insideLineComment = false; /*Tracks whether or not character check is still within a Line Comment.*/
var insideBlockComment = false; /*Tracks whether or not character check is still within a Block Comment.*/
var insideQuotation = false; /*Tracks whether or not character check is still within a Quotation.*/

var currentCharacter; /*Stores latest character for checking.*/
var previousCharacter; /*Stores previous character for comment sequence check.*/
var whitespace = new RegExp("\\s"); /* Variable to store the result of the function that checks the currentCharacter against all regular whitespace expressions.*/

//Calling Functions

this.onload = FetchJavaSourceFile(); /*Starts the sequence of functions that will count the number of lines of code in the fetched java source file.*/

// Functions

async function FetchJavaSourceFile() /*Fetches the java source file from the URL given, then pulls the date from that file and stores it as text in the textData variable*/
{
	await fetch(javaSourceFile) /*The script will wait until the fetched file is loaded fully before pulling the data and calling the CodeLineCheck function.*/
		.then(function(response)
		{
			return response.text();
		})
		.then(function(data)
		{
			textData = data;
			//console.log(textData);
			//console.log(textData.length);
		})

	CodeLineCheck();

}

function CodeLineCheck() /*This function checks every character in the textData, looking for patterns and cues that indicate the presence of a Line of Code, a Comment or a Quotation. Ignoring Whitespaces.*/
{
	for (var i = 0; i < textData.length; i++)
	{
		currentCharacter = textData.charAt(i);

		if (currentCharacter != "\n")
		{
			//console.log(currentCharacter);

			if (insideLineComment == false && insideBlockComment == false && insideQuotation == false)
			{
				if (whitespace.test(currentCharacter) == true)
				{
					//console.log("Whitespace");
				}
				else if (currentCharacter == "\"" || currentCharacter == "\'")
				{
					insideQuotation = true
					//console.log("Quotation Opened");
				}
				else if (currentCharacter == "/" && previousCharacter == "/")
				{
					insideLineComment = true;
					//console.log("Line Comment Open");
				}
				else if (currentCharacter == "*" && previousCharacter == "/")
				{
					insideBlockComment = true;
					//console.log("Block Comment Open");
				}
				else if (currentCharacter != "/" && insideBlockComment == false && insideLineOfCode == false)
				{
					insideLineOfCode = true;
					//console.log("Line of Code Started");
					n = n + 1;
				}
			}
			else if (insideBlockComment == true && insideQuotation == false)
			{
				if (currentCharacter == "/" && previousCharacter == "*")
				{
					blockCommentCounter = blockCommentCounter + 1;
					//console.log("Block Comment Closed");
					insideBlockComment = false;
					currentCharacter = null;
				}
			}
			else if (insideQuotation == true)
			{
				if (currentCharacter == "\"" || currentCharacter == "\'")
				{
					//console.log("Quotation Closed")
					insideQuotation = false;
				}
			}
		}
		else if (currentCharacter == "\n")
		{
			//console.log("Line Break");

			if (insideLineComment == true)
			{
				lineCommentCounter = lineCommentCounter + 1;
				//console.log("Line Comment Closed");
				insideLineComment = false;
			}
			if (insideLineOfCode == true)
			{
				//console.log("Line of Code Finished")
				insideLineOfCode = false;
			}
		}

		previousCharacter = currentCharacter;

	}

	Output(); /*The Output function is called which simply writes the output 'n' to the browser when the index.html file is loaded.*/

}

function Output()
{
	console.log("Number of Lines of Code = " + n);
	//console.log("Number of Line Comments = " + lineCommentCounter);
	//console.log("Number of Block Comments = " + blockCommentCounter);
}