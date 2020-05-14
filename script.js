// Variables

var javaSourceFile = "https://raw.githubusercontent.com/mikadutoit/JavaScript-Code-Line-Counter/master/Input/Test1.js"; /*URL for Java Source File to be Checked.*/
var textData;

var n = 0; /*Number of Lines of Code*/
var blockCommentCounter = 0; /*Number of Block Comments*/
var lineCommentCounter = 0; /*Number of Line Comments*/

var insideLineOfCode = false; /*Tracks whether or not character check is still within a Line of Code*/
var insideLineComment = false; /*Tracks whether or not character check is still within a Block Comment*/
var insideBlockComment = false; /*Tracks whether or not character check is still within a Block Comment*/
var insideQuotation = false; /*Tracks whether or not character check is still within a Quotation*/

var currentCharacter; /*Stores Latest Character for Checking*/
var previousCharacter; /*Stores Previous Character for Comment Command Check*/
var whitespace = new RegExp("\\s");

//Calling Functions

this.onload = FetchJavaSourceFile();

// Functions

async function FetchJavaSourceFile()
{
	await fetch(javaSourceFile)
		.then(function(response)
		{
			return response.text();
		})
		.then(function(data)
		{
			textData = data;
			console.log(textData);
			console.log(textData.length);
		})

	CodeLineCheck();

}

function CodeLineCheck()
{
	for (var i = 0; i < textData.length; i++)
	{
		currentCharacter = textData.charAt(i);

		if (currentCharacter != "\n")
		{
			console.log(currentCharacter);

			if (insideLineComment == false && insideBlockComment == false && insideQuotation == false)
			{
				if (whitespace.test(currentCharacter) == true)
				{
					//console.log("Whitespace");
				}
				else if (currentCharacter == "\"" || currentCharacter == "\'")
				{
					insideQuotation = true
					console.log("Quotation Opened");
				}
				else if (currentCharacter == "/" && previousCharacter == "/")
				{
					insideLineComment = true;
					console.log("Line Comment Open");
				}
				else if (currentCharacter == "*" && previousCharacter == "/")
				{
					insideBlockComment = true;
					console.log("Block Comment Open");
				}
				else if (currentCharacter != "/" && insideBlockComment == false && insideLineOfCode == false)
				{
					insideLineOfCode = true;
					console.log("Line of Code Started");
					n = n + 1;
				}
			}
			else if (insideBlockComment == true && insideQuotation == false)
			{
				if (currentCharacter == "/" && previousCharacter == "*")
				{
					blockCommentCounter = blockCommentCounter + 1;
					console.log("Block Comment Closed");
					insideBlockComment = false;
					currentCharacter = null;
				}
			}
			else if (insideQuotation == true)
			{
				if (currentCharacter == "\"" || currentCharacter == "\'")
				{
					console.log("Quotation Closed")
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
				console.log("Line Comment Closed");
				insideLineComment = false;
			}
			if (insideLineOfCode == true)
			{
				console.log("Line of Code Finished")
				insideLineOfCode = false;
			}
		}

		previousCharacter = currentCharacter;

	}

	Output();

}

function Output()
{
	console.log("Number of Lines of Code = " + n);
	//console.log("Number of Line Comments = " + lineCommentCounter);
	//console.log("Number of Block Comments = " + blockCommentCounter);
}

