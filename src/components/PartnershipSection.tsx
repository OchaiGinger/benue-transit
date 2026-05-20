export const PartnersSection = () => {
  const partners = [
    {
      name: "NNPC",
      description: "Fuel and energy supply",
      logo: "http://googleusercontent.com/image_collection/image_retrieval/15476509850897677595_0",
    },
    {
      name: "Zenith Bank",
      description: "Payment infrastructure",
      logo: "http://googleusercontent.com/image_collection/image_retrieval/11765241653189454381_0",
    },
    {
      name: "Dangote Group",
      description: "Strategic fuel procurement",
      logo: "http://googleusercontent.com/image_collection/image_retrieval/1273933891509945418_0",
    },
    {
      name: "Flutterwave",
      description: "Digital booking payments",
      logo: "http://googleusercontent.com/image_collection/image_retrieval/11059629619750636160_0",
    },
    {
      name: "Toyota Nigeria",
      description: "Fleet maintenance and parts",
      logo: "http://googleusercontent.com/image_collection/image_retrieval/4760134286399831814_0",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-4 animate-fade-in-up">
          Strategic Partnerships
        </h2>
        <p className="text-center text-muted-foreground mb-12 lg:mb-16 max-w-2xl mx-auto animate-fade-in-up">
          Collaborating with industry leaders to power reliable transit across
          Nigeria
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 lg:p-8 bg-white rounded-xl hover-lift animate-fade-in-up group shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 mb-4 lg:mb-5 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-base lg:text-lg font-bold text-center text-foreground mb-2">
                {partner.name}
              </h3>
              <p className="text-xs lg:text-sm text-center text-muted-foreground">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
