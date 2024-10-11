// LandingPage.tsx
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Counter {
  count: number;
}

const LandingPage = () => {
  const [counter1, setCounter1] = useState<Counter>({ count: 0 });
  const [counter2, setCounter2] = useState<Counter>({ count: 0 });

  const handleIncrement = (counter: Counter) => {
    switch (counter) {
      case counter1:
        setCounter1({ count: counter.count + 1 });
        break;
      case counter2:
        setCounter2({ count: counter.count + 1 });
        break;
      default:
        console.error("Unknown counter");
    }
  };

  return (
    <div className="flex-1 flex justify-center bg-slate-100 overflow-y-auto">
      <div className="max-w-[1280px] p-12 text-left">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Replay test page</h1>
          </div>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Dropdown menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="mb-16">This is a fake landing page.</p>
        <div className="space-y-4">
          <p>
            Duis consectetur ea et cillum culpa nisi elit esse ipsum ea proident
            laborum. Amet magna officia et pariatur est minim nostrud eu sunt
            qui. Consectetur exercitation non est ipsum amet tempor. Nulla
            aliquip reprehenderit ipsum sunt duis ea sunt.
          </p>
          <p>
            Nostrud dolor enim dolor sint qui non irure. In pariatur mollit
            minim nisi proident sint veniam et ad sit. Sunt sunt in ipsum
            commodo quis excepteur consequat velit est. Fugiat occaecat do
            aliquip elit quis do non cillum eu excepteur ex ullamco et aliqua
            ullamco. Ipsum dolor dolor anim. Magna anim ad sint ex veniam esse
            non laboris eu ut cupidatat nisi non velit.
          </p>
          <p>
            Do laboris commodo ex consectetur ad dolore ipsum exercitation
            aliquip. Adipisicing enim sint ex esse enim aliquip dolore. Deserunt
            reprehenderit eiusmod dolore cillum consequat irure officia eiusmod
            irure laborum. Commodo magna eu fugiat nulla. Cupidatat irure
            officia aute et et commodo aute eiusmod amet est sint aliqua ut
            aliquip. Consequat officia culpa velit ut id tempor enim laboris
            cupidatat laborum laborum. In ad dolore officia irure occaecat
            labore consequat veniam consectetur velit incididunt et. Fugiat est
            ad Lorem dolor consequat qui culpa in minim voluptate exercitation
            aliqua amet pariatur.
          </p>
          <div className="flex space-x-4">
            <Button onClick={() => handleIncrement(counter1)}>
              Counter (count: {counter1.count})
            </Button>
            <Button onClick={() => handleIncrement(counter2)} disabled>
              Disabled counter (count: {counter2.count})
            </Button>
          </div>
        </div>

        <br />
        <br />
      </div>
    </div>
  );
};

export default LandingPage;
