import { createSignal } from "solid-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Switch,
  Heading,
  TextLead,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@ark-preset/solid";

export default function PricingBlockCards() {
  const [isYearly, setIsYearly] = createSignal(false);

  const tiers = [
    {
      name: "Basic",
      description: "Essential features for individuals.",
      monthlyPrice: 9,
      yearlyPrice: 90,
      features: [
        { text: "1 User", tooltip: null },
        { text: "10 Projects", tooltip: "Active projects at any given time." },
        { text: "Community Support", tooltip: null },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "Advanced tools for growing teams.",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        { text: "Up to 5 Users", tooltip: null },
        { text: "Unlimited Projects", tooltip: null },
        { text: "Priority Support", tooltip: "Response time under 24 hours." },
        { text: "Advanced Analytics", tooltip: "Access to custom reporting." },
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations.",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        { text: "Unlimited Users", tooltip: null },
        { text: "Dedicated Account Manager", tooltip: null },
        { text: "24/7 Phone Support", tooltip: null },
        { text: "Custom Integrations", tooltip: "API access and webhook limits lifted." },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div class="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <Heading level={2} class="mb-4">
          Simple, transparent pricing
        </Heading>
        <TextLead class="mb-8">Choose the plan that's right for you.</TextLead>

        <div class="flex items-center justify-center gap-3">
          <span class={!isYearly() ? "font-bold text-sm" : "text-muted-foreground text-sm"}>
            Monthly
          </span>
          <Switch
            checked={isYearly()}
            onCheckedChange={(details) => setIsYearly(details.checked)}
          />
          <div class="flex items-center gap-1.5">
            <span class={isYearly() ? "font-bold text-sm" : "text-muted-foreground text-sm"}>
              Yearly
            </span>
            <Badge variant="secondary" class="text-[10px] py-0 px-1.5">
              Save 20%
            </Badge>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card
            class={`relative flex flex-col ${tier.popular ? "border-primary shadow-lg scale-105 z-10" : ""}`}
          >
            {tier.popular && (
              <div class="absolute -top-3 left-0 right-0 flex justify-center">
                <Badge variant="default" class="uppercase text-[10px] tracking-wider font-bold">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader>
              <CardTitle class="text-xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div class="mt-4 flex items-baseline text-5xl font-extrabold">
                ${isYearly() ? tier.yearlyPrice : tier.monthlyPrice}
                <span class="ml-1 text-xl font-medium text-muted-foreground">
                  /{isYearly() ? "yr" : "mo"}
                </span>
              </div>
            </CardHeader>

            <CardContent class="flex-1">
              <ul class="space-y-3">
                {tier.features.map((feature) => (
                  <li class="flex items-start gap-2">
                    <svg
                      class="h-4 w-4 text-primary shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div class="text-sm leading-tight">
                      {feature.text}
                      {feature.tooltip && (
                        <Tooltip>
                          <TooltipTrigger
                            asChild={(props) => (
                              <span
                                {...props()}
                                class="inline-block align-text-bottom ml-1.5 text-muted-foreground hover:text-foreground cursor-help"
                              >
                                <svg
                                  class="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </span>
                            )}
                          />
                          <TooltipContent useArrow class="text-xs max-w-[200px] text-center z-50">
                            {feature.tooltip}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button variant={tier.popular ? "default" : "outline"} class="w-full">
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
