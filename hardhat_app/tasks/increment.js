task("increment", "INcrement")
    .setAction(async (taskArgs, hre) => {

        const TestPlatform = await hre.ethers.getContractFactory("Test")

        const platform = new hre.ethers.Contract(
            "0x9aE800e141Bc3c9823D3C55Eb9B6e92babf6d04d",
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
