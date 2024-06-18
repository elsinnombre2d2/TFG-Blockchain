module.exports = {
  contracts_build_directory: "../client/src/build/contracts",
    // See <http://truffleframtruework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8406,
        network_id: "*", // Match any network id
        production:true,
        from: "0x2eff9c17682feDdD7c7d4F1c9Ab03c9f8818C6De"
        
      },
      develop: {
        port: 8545
      }
    },
    compilers: {
        solc: {
          version: "0.8.8",
          settings: {
            optimizer: {
              enabled: true,
              runs: 10
            }
          }
        }
    },

  };