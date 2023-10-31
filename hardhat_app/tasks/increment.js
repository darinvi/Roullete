task("increment", "INcrement")
    .setAction(async (taskArgs, hre) => {

        const TestPlatform = await hre.ethers.getContractFactory("Test")

        const platform = new hre.ethers.Contract(
            "0xbdee009fa4f88d54be77ce8313e78c988eb26c40",
            TestPlatform.interface,
            await hre.ethers.getSigner(taskArgs.account)
        );

        console.log("Test before")
        console.log(await platform.test())

        const tx = await platform.increment(50)

        await tx.wait();
        console.log("Test after")
        console.log(await platform.test())
    });
