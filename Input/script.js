// Variables

var JavaSourceFile = "https://raw.githubusercontent.com/mikadutoit/JavaScript-Code-Line-Counter/master/Input/Test1.js"; /*URL for Java Source File to be Checked.*/
var textData;
var n = 0;/*Number of Lines of Code*/
var blockCommentCounter = 0;/*Number of Block Comments*/
var lineCommentCounter = 0;/*Number of Line Comments*/
var whitespaces = 0;
var insideLineOfCode = false;/*Tracks whether or not character check is still within a Line of Code*/
var insideLineComment = false;/*Tracks whether or not character check is still within a Block Comment*/
var insideBlockComment = false;/*Tracks whether or not character check is still within a Block Comment*/
var currentCharacter;/*Stores Latest Character for Checking*/
var previousCharacter;/*Stores Previous Character for Comment Command Check*/

//Calling Functions

this.onload = FetchJavaSourceFile();

// Functions

async function FetchJavaSourceFile()
{
	await fetch(JavaSourceFile)
		.then(function(response)
		{
			return response.text();
		})
		.then(function(data)
		{
			textData = data;
			console.log(textData);
		})
		
	CodeLineCheck();
}

function CodeLineCheck()
{
	for (var i = 0; i < textData.length; i++)
	{
		currentCharacter = textData.charAt(i);
		console.log(currentCharacter);

		if (currentCharacter != "\n")
		{
			if (insideLineComment == false && insideBlockComment == false)
			{
				if (currentCharacter != ("\t" || "\r" || "\v"))
				{
					if (currentCharacter == "/" && previousCharacter == "/")
	  				{
	  					if (insideLineOfCode == true)
	  					{
	  						n = n + 1;
	  						console.log ("TrueTrue");
	  						insideLineOfCode = false;
	  						insideLineComment = true;
	  					}
	  					else
	  					{
	  						insideLineComment = true;
	  					}
	  				}
	  				else if (currentCharacter == "*" && previousCharacter == "/")
					{
						insideBlockComment = true;
					}
					else if (insideLineOfCode == false && currentCharacter != "/")
					{
						insideLineOfCode = true;
						console.log("Return");
					}
				}
				else
				{
					whitespaces = whitespaces + 1;
				}
			}
			else if (insideLineComment == false && insideBlockComment == true)
			{
				if (currentCharacter == "/" && previousCharacter == "*")
				{
					insideBlockComment = false;
					blockCommentCounter = blockCommentCounter + 1;
				}
			}
		}
		else if (currentCharacter == "\n")
		{
			if (insideLineComment == true)
			{
				lineCommentCounter = lineCommentCounter + 1;
				insideLineComment = false;
			}
			else if (insideLineOfCode == true)
			{
				n = n + 1;
				console.log ("True");
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
	console.log("Number of Line Comments = " + lineCommentCounter);
	console.log("Number of Block Comments = " + blockCommentCounter);
	console.log(whitespaces);
}