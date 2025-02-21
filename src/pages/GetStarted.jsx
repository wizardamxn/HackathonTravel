"use client"

import React from "react";


import { useState } from "react"
import { PlusCircle, Home, Bookmark, Send } from "lucide-react"


const API_KEY =  "AIzaSyCdzXTKFFTZACAxNfOc1P3UnLqXxw7hbVU";
const API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const GetStarted = () => {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const fetchOutput = async (inputText) => {
    if (!inputText.trim()) return; // Handle empty input
    
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${inputText}, I want the Distance between the places I specify. The travelling time and vehicular transport all should be mentioned in the output also. AND The answer should be of minimum words no long paragraphs just straight to the point. AND If the user types other non-sense than that of mentioned previously just say "Places mentioned are not in the data". AND Only output the data in points not in paras or lines. AND for the time taken to reach specify each and every Transportation mode and their time taken respectively. AND the price will be also like the latter. ALso IF THE USER ASKS ABOUT A SPECIFIC PLACE JUST TELL THEM ABOUT THE PLACE.`
            }]
          }],
          generationConfig: {
            maxOutputTokens: 8192, // Fixed to valid token limit
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle API errors
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid API response structure");
      }

      setOutput(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Fetch error:", error);
      setOutput("Error fetching data. Please try again.");
    }
    
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b dark:border-gray-700">
            <h1 className="text-xl font-bold">Team Creed</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 ease-in-out">
              <PlusCircle className="mr-2" size={18} />
              New Chat
            </button>
          </div>
          <nav className="p-4 border-t dark:border-gray-700">
            <ul className="space-y-2">
              <li>
                <button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-left font-medium py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out">
                  <Home className="mr-2" size={18} />
                  Home
                </button>
              </li>
              <li>
                <button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-left font-medium py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out">
                  <Bookmark className="mr-2" size={18} />
                  Saved
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-cyan-300 dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
              <p className="whitespace-pre-wrap">{output}</p>
            </div>
          </div>
        </div>
        <div className="border-t dark:border-gray-700 p-4">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                fetchOutput(input)
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Lamar..."
                className="flex-1 p-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 ease-in-out"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
};

export default GetStarted;
