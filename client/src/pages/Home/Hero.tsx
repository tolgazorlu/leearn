import { Button } from "@/components/ui/button";
import HeroImage from "@/assets/hero.svg";

export default function Hero() {
    return (
        <>
            {/* Hero */}
            <div className="container p-4 max-w-7xl mx-auto">
                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                    <div>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Leearn: Improve your skills with web3 platform
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground">
                            Leearn is a web3 platform that helps you improve
                            your skills, learn new things, and grow your career.
                        </p>
                        {/* Buttons */}
                        <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                            <Button size={"lg"}>Get started</Button>
                            <Button variant={"outline"} size={"lg"}>
                                Contact sales team
                            </Button>
                        </div>
                        {/* End Buttons */}
                    </div>
                    {/* Col */}
                    <div className="relative ms-4">
                        <img
                            className="w-full"
                            src={HeroImage}
                            alt="Hero Image"
                        />
                    </div>
                    {/* End Col */}
                </div>
                {/* End Grid */}
            </div>
            {/* End Hero */}
        </>
    );
}
