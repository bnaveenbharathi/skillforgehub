
import React from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const jsTests = [
  {
    id: 1,
    name: "FizzBuzz Challenge",
    description: "Write a function to print numbers 1-100 with FizzBuzz rules.",
    logic: [
      "Start a loop from 1 to 100.",
      "For each number, check if it is divisible by 3. If yes, prepare to print 'Fizz'.",
      "Check if the number is divisible by 5. If yes, prepare to print 'Buzz'.",
      "If the number is divisible by both 3 and 5, print 'FizzBuzz'.",
      "If the number is divisible by only one (3 or 5), print 'Fizz' or 'Buzz' accordingly.",
      "If the number is not divisible by either, print the number itself."
    ]
  },
  {
    id: 2,
    name: "Palindrome Checker",
    description: "Check if a given string is a palindrome.",
    logic: [
      "Take the input string.",
      "Reverse the string using string manipulation methods.",
      "Compare the original string with the reversed string.",
      "If both are the same, the string is a palindrome.",
      "If not, it is not a palindrome."
    ]
  },
  {
    id: 3,
    name: "Array Sum",
    description: "Return the sum of all numbers in an array.",
    logic: [
      "Take the input array of numbers.",
      "Initialize a variable to store the sum, starting at zero.",
      "Loop through each number in the array.",
      "Add each number to the sum variable.",
      "After the loop, the sum variable contains the total of all numbers."
    ]
  },
  {
    id: 4,
    name: "Reverse String",
    description: "Reverse a given string.",
    logic: [
      "Take the input string.",
      "Split the string into individual characters.",
      "Reverse the order of the characters.",
      "Join the characters back together to form the reversed string."
    ]
  },
  {
    id: 5,
    name: "Find Max",
    description: "Find the maximum value in an array.",
    logic: [
      "Take the input array of numbers.",
      "Initialize a variable to hold the maximum value, starting with the first element.",
      "Loop through the array, comparing each number to the current maximum.",
      "If a number is greater than the current maximum, update the maximum value.",
      "After the loop, the maximum variable holds the largest number in the array."
    ]
  },
];

const coding = () => {
  const [selectedTest, setSelectedTest] = React.useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Navbar */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gradient">SkillForge Hub</span>
            </Link>
            <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Coding Tests Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-xl mx-auto bg-white/80 rounded-3xl shadow-lg p-6 flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-center">Available JavaScript Coding Tests</h2>
          {!selectedTest ? (
            <ul className="space-y-4">
              {jsTests.map(test => (
                <li
                  key={test.id}
                  className="p-4 rounded-xl border border-border bg-background/50 cursor-pointer hover:bg-primary/10 transition"
                  onClick={() => setSelectedTest(test)}
                >
                  <div className="font-semibold text-lg text-primary mb-1">{test.name}</div>
                  <div className="text-muted-foreground text-sm">{test.description}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 rounded-xl border border-primary bg-background/80">
              <div className="font-semibold text-lg text-primary mb-1">{selectedTest.name}</div>
              <div className="text-muted-foreground text-sm mb-2">{selectedTest.description}</div>
              <div className="bg-background/90 p-3 rounded mb-2">
                <strong>Step-by-Step Solution:</strong>
                <ol className="mt-2 text-sm text-foreground bg-background/80 p-2 rounded list-decimal list-inside">
                  {selectedTest.logic.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
              <Link to="/ide" className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80">Go to IDE</Link>
              <button className="ml-4 text-muted-foreground underline" onClick={() => setSelectedTest(null)}>Back to Tests</button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default coding;
