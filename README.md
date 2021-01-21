# homebrew-robo-tool-finder

This tool was designed to house information about all robo commands all in one place!

## Installation

1. $ git clone https://github.com/spencerattick/homebrew-robo-tool-finder.git
2. $ cd homebrew-robo-cli
3. $ npm install
4. $ node ready/letsgo.js

## Setting up an alias

To call this command from anywhere via the terminal you can setup an alias like below:

```
#First run pwd from the directory
pwd
#Sample output: /Users/niall.brennan/Documents/homebrew-robo-tool-finder
```

Use the output from the above to add an alias (might be easier to write this commadn out in a text editor)

```
# If you're using ZSH as your shell (echo $SHELL should output /bin/zsh):
echo 'alias robo-info="/Users/niall.brennan/Documents/homebrew-robo-tool-finder/ready/letsgo.js"' >> ~/.zshrc
source ~/.zshrc
```

```
# Or, if you're using Bash as your shell ($SHELL is /bin/bash):
echo 'alias robo-info="/Users/niall.brennan/Documents/homebrew-robo-tool-finder/ready/letsgo.js"' >> ~/.bashrc
source ~/.bashrc
```